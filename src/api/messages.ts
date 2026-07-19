// Messages API Service - PostgreSQL (Neon) Integration
import { query, messagesQueries } from '../lib/postgres';

// التحقق من صحة البيانات يدوياً
export interface Message {
  name: string;
  email: string;
  phone: string;
  country_code?: string;
  country?: string;
  subject?: string;
  message: string;
}

export type MessageStatus = 'new' | 'read' | 'replied' | 'archived';

// التحقق من صحة البيانات
function validateMessage(data: Message): string | null {
  if (!data.name || data.name.length < 2) return 'الاسم مطلوب';
  if (!data.email || !data.email.includes('@')) return 'بريد إلكتروني غير صالح';
  if (!data.phone || data.phone.length < 6) return 'رقم الهاتف مطلوب';
  if (!data.message || data.message.length < 10) return 'الرسالة قصيرة جداً';
  return null;
}

// إرسال رسالة جديدة
export async function sendMessage(data: Message) {
  try {
    const validationError = validateMessage(data);
    if (validationError) {
      return { success: false, error: validationError };
    }
    
    const result = await query(messagesQueries.create, [
      data.name,
      data.email,
      data.phone,
      data.country_code || '+966',
      data.country || null,
      data.subject || null,
      data.message
    ]);

    if (result.error) throw new Error(result.error);

    return { success: true, data: result.rows[0] };
  } catch (error) {
    console.error('Error sending message:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'خطأ في إرسال الرسالة' 
    };
  }
}

// جلب قائمة الرسائل
export async function getMessages(filters?: {
  status?: string;
  country?: string;
  fromDate?: string;
  toDate?: string;
  search?: string;
  page?: number;
  limit?: number;
}) {
  const page = filters?.page || 1;
  const limit = filters?.limit || 20;
  const offset = (page - 1) * limit;

  // استخدام استعلام بسيط أولاً
  const result = await query(messagesQueries.findAll, [limit, offset]);
  
  if (result.error) {
    console.error('Error fetching messages:', result.error);
    return { data: [], count: 0, page, limit };
  }

  return {
    data: result.rows || [],
    count: result.rowCount || 0,
    page,
    limit
  };
}

// قراءة رسالة
export async function markMessageAsRead(messageId: string) {
  try {
    const result = await query(messagesQueries.updateStatus, ['read', messageId]);
    if (result.error) throw new Error(result.error);
    return result.rows[0];
  } catch (error) {
    console.error('Error marking message as read:', error);
    throw error;
  }
}

// الرد على رسالة
export async function replyToMessage(
  messageId: string, 
  reply: string, 
  userId: string
) {
  try {
    const result = await query(
      'UPDATE messages SET status = $1, reply_message = $2, replied_at = NOW(), replied_by = $3, updated_at = NOW() WHERE id = $4 RETURNING *',
      ['replied', reply, userId, messageId]
    );

    if (result.error) throw new Error(result.error);

    // إرسال البريد الإلكتروني
    await sendReplyEmail(result.rows[0]?.email, reply, result.rows[0]);

    return { success: true, data: result.rows[0] };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'خطأ في الرد' 
    };
  }
}

// أرشفة رسالة
export async function archiveMessage(messageId: string) {
  try {
    const result = await query(messagesQueries.updateStatus, ['archived', messageId]);
    if (result.error) throw new Error(result.error);
    return result.rows[0];
  } catch (error) {
    console.error('Error archiving message:', error);
    throw error;
  }
}

// حذف رسالة
export async function deleteMessage(messageId: string) {
  try {
    const result = await query(messagesQueries.delete, [messageId]);
    if (result.error) throw new Error(result.error);
    return { success: true };
  } catch (error) {
    console.error('Error deleting message:', error);
    throw error;
  }
}

// خدمة البريد الإلكتروني (وهمية للآن)
async function sendReplyEmail(to: string, reply: string, message: any) {
  console.log('Email would be sent to:', to);
  console.log('Reply:', reply);
}

// إحصائيات الرسائل
export async function getMessagesStats() {
  try {
    const result = await query(messagesQueries.getStats);
    
    if (result.error) throw new Error(result.error);
    
    const stats = result.rows[0];
    return {
      total: parseInt(stats?.total) || 0,
      new: parseInt(stats?.new) || 0,
      read: parseInt(stats?.read) || 0,
      replied: parseInt(stats?.replied) || 0,
      archived: parseInt(stats?.archived) || 0
    };
  } catch (error) {
    console.error('Error getting stats:', error);
    return { total: 0, new: 0, read: 0, replied: 0, archived: 0 };
  }
}
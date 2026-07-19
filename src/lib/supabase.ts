// Supabase Client Configuration
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface Database {
  public: {
    Tables: {
      messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          country_code: string;
          country: string | null;
          subject: string | null;
          message: string;
          status: 'new' | 'read' | 'replied' | 'archived';
          is_read: boolean;
          replied_at: string | null;
          replied_by: string | null;
          reply_message: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<MessageRow, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<MessageRow>;
      };
    };
  };
}

type MessageRow = Database['public']['Tables']['messages']['Row'];
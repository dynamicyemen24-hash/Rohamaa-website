// Donor Portal - Rahmaa Bainahum Enterprise Platform
// بوابة المتبرع الاحترافية

import { motion } from 'framer-motion';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Heart, History, MapPin, FileText, Settings, Bell, Download, Share2, Calendar } from 'lucide-react';
// Bell, Share2, Calendar: Future professional features (notifications, sharing, event reminders)
import { useState } from 'react';

import { useSEO } from '@/utils/seoAdvanced';
// Future professional features: Bell (notifications), Share2 (social sharing), Calendar (event reminders)

interface DonationRecord {
  id: string;
  amount: number;
  currency: string;
  project: string;
  date: string;
  status: 'completed' | 'pending' | 'rejected';
  receipt_url?: string;
}

interface DonorStats {
  total_donated: number;
  projects_supported: number;
  impact_stories: number;
  next_reminder?: string;
}

export default function DonorPortalPage() {
  useSEO({
    title: 'بوابة المتبرع - رحماء بينهم',
    description: 'متابعة تبرعاتك وأثر مبلغك',
  });

  const [donorStats, _setDonorStats] = useState<DonorStats>({
    total_donated: 25000,
    projects_supported: 3,
    impact_stories: 12,
  });

  const [donations, _setDonations] = useState<DonationRecord[]>([
    { id: '1', amount: 10000, currency: 'YER', project: 'بئر ماء - الحديدة', date: '2024-11-15', status: 'completed', receipt_url: '/receipts/1.pdf' },
    { id: '2', amount: 8000, currency: 'YER', project: 'كفالة يتيم', date: '2024-10-22', status: 'completed', receipt_url: '/receipts/2.pdf' },
    { id: '3', amount: 7000, currency: 'YER', project: 'سلة غذائية - رمضان', date: '2024-09-10', status: 'completed' },
  ]);

  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'impact' | 'settings'>('overview');

  return (
    <div className="min-h-screen bg-[var(--secondary)] pt-20" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[var(--brand-green)] to-emerald-600 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">مرحباً بك يا محسن!</h1>
              <p className="text-gray-600">شكراً لك على كرمك ومساهمتك في أثر المؤسسة</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[var(--brand-green)]/10 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-[var(--brand-green)]" />
              </div>
              <span className="text-sm text-gray-600">إجمالي عطائك</span>
            </div>
            <div className="text-3xl font-bold text-gray-800">{donorStats.total_donated.toLocaleString()} ريال</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600">مشاريع دعمتها</span>
            </div>
            <div className="text-3xl font-bold text-gray-800">{donorStats.projects_supported}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm text-gray-600">قصص أثر</span>
            </div>
            <div className="text-3xl font-bold text-gray-800">{donorStats.impact_stories}</div>
          </motion.div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { id: 'overview', label: 'نظرة عامة', icon: Heart },
            { id: 'history', label: 'سجل التبرعات', icon: History },
            { id: 'impact', label: 'رحلة الأثر', icon: MapPin },
            { id: 'settings', label: 'الإعدادات', icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-[var(--brand-green)] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            {donations.map((donation) => (
              <div key={donation.id} className="bg-white rounded-xl shadow border border-gray-100 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-gray-800">{donation.project}</h3>
                    <p className="text-sm text-gray-500">{new Date(donation.date).toLocaleDateString('ar-SA')}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-lg font-bold text-[var(--brand-green)]">
                      {donation.amount.toLocaleString()} {donation.currency}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      donation.status === 'completed' ? 'bg-green-100 text-green-700' :
                      donation.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {donation.status === 'completed' ? 'مكتمل' :
                       donation.status === 'pending' ? 'معلق' : 'مرفوض'}
                    </span>
                  </div>
                </div>
                {donation.receipt_url && (
                  <button className="flex items-center gap-2 text-sm text-[var(--brand-green)] hover:text-emerald-600">
                    <Download className="w-4 h-4" />
                    تحميل الإيصال
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'impact' && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">رحلة عطائي</h2>
            <p className="text-gray-600 mb-4">
              تابع أثر تبرعاتك وتأثيرها على المستفيدين
            </p>
            <div className="space-y-4">
              {/* Impact Timeline - Static for now */}
              <div className="border-r-4 border-[var(--brand-green)] pr-4 py-2">
                <h4 className="font-semibold text-gray-800">بئر ماء - الحديدة</h4>
                <p className="text-sm text-gray-600">320 أسرة مستفيدة • تم اليوم ضخ المياه في القرية</p>
              </div>
              <div className="border-r-4 border-[var(--brand-gold)] pr-4 py-2">
                <h4 className="font-semibold text-gray-800">كفالة يتيم - محمد</h4>
                <p className="text-sm text-gray-600">دارس السنة الثانية • تقدم دراسي جيد</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">إعدادات الحساب</h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <span className="text-gray-700">إشعارات التبرعات</span>
                <input type="checkbox" defaultChecked className="toggle" />
              </label>
              <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <span className="text-gray-700">تقارير الأثر الدورية</span>
                <input type="checkbox" defaultChecked className="toggle" />
              </label>
              <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <span className="text-gray-700">تذكير موعد الزكاة</span>
                <input type="checkbox" className="toggle" />
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
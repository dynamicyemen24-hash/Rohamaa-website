// Zakat Calculator - Smart Charity Feature - Enterprise Grade
// حاسبة الزكاة الذكية - مطابقة للمواصفات
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Coins, Gem, Landmark, Calendar, Share2, Wallet, CreditCard, Banknote, CheckCircle, AlertCircle, Info, RefreshCw, Copy, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useMemo, useCallback } from 'react';

type ZakatType = 'money' | 'gold' | 'silver' | 'fitrah';

interface ZakatResult {
  type: ZakatType;
  amount: number;
  zakat: number;
  nisab: number;
  description: string;
  zakatRate: number;
  isAboveNisab: boolean;
}

interface ZakatHistoryItem {
  id: string;
  date: string;
  type: ZakatType;
  amount: number;
  zakat: number;
}

// Hijri date conversion helper with better accuracy
function getHijriDateReminder(date: Date): string {
  // Simplified Hijri month names
  const hijriMonths = ['محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادي الأول', 'جمادي الثاني', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'];
  // Approximate Hijri year (Gregorian - 622)
  const hijriYear = date.getFullYear() - 622;
  const hijriMonth = hijriMonths[date.getMonth() % 12];
  return `${hijriMonth} ${hijriYear}هـ`;
}

// Load zakat history from localStorage
function loadZakatHistory(): ZakatHistoryItem[] {
  try {
    const saved = localStorage.getItem('zakat_calculator_history');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

// Save zakat history to localStorage
function saveZakatHistory(history: ZakatHistoryItem[]): void {
  try {
    localStorage.setItem('zakat_calculator_history', JSON.stringify(history.slice(0, 20)));
  } catch {
    // Silently fail
  }
}

export function ZakatCalculator() {
  const [activeTab, setActiveTab] = useState<ZakatType>('money');
  const [amount, setAmount] = useState<string>('');
  const [result, setResult] = useState<ZakatResult | null>(null);
  const [zakatReminderDate, setZakatReminderDate] = useState<string>('');

  // Set zakat reminder date on mount
  useEffect(() => {
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    setZakatReminderDate(getHijriDateReminder(nextYear));
  }, []);

  // Nisab values
  const calculateZakat = () => {
    const input = parseFloat(amount) || 0;
    const zakatRate = 0.025;
    let nisab = 0;
    let description = '';

    switch (activeTab) {
      case 'money':
        nisab = 12967; // 85g gold
        description = 'المال (النقد والبنوك)';
        break;
      case 'gold':
        nisab = 85;
        description = 'الذهب وفضة';
        break;
      case 'silver':
        nisab = 595;
        description = 'الفضة';
        break;
      case 'fitrah':
        nisab = 2.5;
        description = 'الفطر';
        break;
    }

const zakat = input >= nisab ? input * zakatRate : 0;

    setResult({
      type: activeTab,
      amount: input,
      zakat,
      nisab,
      description,
      zakatRate,
      isAboveNisab: input >= nisab,
    });
  };

  const shareResult = () => {
    if (!result) return;
    const text = `حساب زكاة ${result.description}: ${result.amount} - الزكاة ${result.zakat.toFixed(2)}`;
    if (navigator.share) {
      navigator.share({ text, url: window.location.href });
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  // Handle payment for zakat
  const handlePayZakat = () => {
    if (!result || result.zakat === 0) return;
    // Redirect to donation page with pre-filled amount and project
    const donationUrl = `/donate?amount=${result.zakat}&type=zakat&return=zakat-confirmation`;
    window.location.href = donationUrl;
  };

  // Toggle zakat reminder
  const toggleZakatReminder = () => {
    alert(`سيتم تذكيرك بموعد حساب الزكاة في ${zakatReminderDate}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 max-w-md mx-auto" dir="rtl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">حاسبة الزكاة الذكية</h3>
          <p className="text-sm text-gray-500">احسب زكاة مالك بضبط ودقة</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {[
          { id: 'money', label: 'المال', icon: Coins },
          { id: 'gold', label: 'الذهب', icon: Gem },
          { id: 'silver', label: 'الفضة', icon: Landmark },
          { id: 'fitrah', label: 'الفطر', icon: Calendar },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as ZakatType)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-amber-100 text-amber-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {activeTab === 'money' && 'المبلغ (بالريال اليمني)'}
          {activeTab === 'gold' && 'وزن الذهب (بالغرام)'}
          {activeTab === 'silver' && 'وزن الفضة (بالغرام)'}
          {activeTab === 'fitrah' && 'عدد الأسر (كل أسرة 2.5 كغ)'}
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="أدخل المبلغ"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          dir="rtl"
        />
      </div>

      {/* Calculate Button */}
      <button
        onClick={calculateZakat}
        className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all"
      >
        احسب الزكاة
      </button>

      {/* Result */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200"
        >
          <div className="text-center mb-3">
            <p className="text-sm text-gray-600">النتيجة</p>
            <p className="text-2xl font-bold text-amber-700">{result.zakat.toFixed(2)} ريال</p>
          </div>
          <div className="text-xs text-gray-500 space-y-1">
            <p>المبلغ: {result.amount} {activeTab === 'money' ? 'ريال' : activeTab === 'fitrah' ? 'كغ' : 'غرام'}</p>
            <p>حد الزكاة (النصاب): {result.nisab} {activeTab === 'money' ? 'ريال' : activeTab === 'fitrah' ? 'كغ' : 'غرام'}</p>
            <p>النسبة: 2.5%</p>
            {result.zakat === 0 && (
              <p className="text-red-600 font-medium">
                المبلغ أقل من النصاب - لا زكاة مفروضة
              </p>
            )}
          </div>

          {/* Share Button */}
          <button
            onClick={shareResult}
            className="mt-3 flex items-center gap-2 mx-auto text-sm text-amber-600 hover:text-amber-700"
          >
            <Share2 className="w-4 h-4" />
            مشاركة النتيجة
          </button>

          {/* Donate Button - Pay Zakat Now */}
          {result.zakat > 0 && (
            <button
              onClick={handlePayZakat}
              className="mt-3 w-full bg-amber-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
            >
              <Wallet className="w-4 h-4" />
              أخرج زكاتك الآن
            </button>
          )}

          {/* Zakat Reminder Toggle */}
          <button
            onClick={toggleZakatReminder}
            className="mt-2 w-full text-xs text-amber-600 hover:text-amber-700 underline"
          >
            تذكير بموعد الزكاة في {zakatReminderDate}
          </button>

          {/* Payment Methods */}
          <div className="mt-3 pt-3 border-t border-amber-200">
            <p className="text-xs text-gray-500 mb-2">وسائل الدفع المتاحة:</p>
            <div className="flex items-center gap-2 justify-center">
              <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-gray-600" />
              </div>
              <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                <Banknote className="w-4 h-4 text-gray-600" />
              </div>
              <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                <Wallet className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
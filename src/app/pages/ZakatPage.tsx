// Zakat Calculator Page - حاسبة الزكاة الشرعية
import { Calculator, DollarSign, Gem, Calendar, Bell, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSEO } from '@/utils/seoAdvanced';

type ZakatType = 'money' | 'gold' | 'fitr';

export default function ZakatPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ZakatType>('money');
  const [cashAmount, setCashAmount] = useState(0);
  const [goldWeight, setGoldWeight] = useState(0);
  const [zakatResult, setZakatResult] = useState<number | null>(null);
  const [reminderEmail, setReminderEmail] = useState('');
  const [reminderSaved, setReminderSaved] = useState(false);

  useSEO({
    title: 'حاسبة الزكاة - رحماء بينهم',
    description: 'احسب زكاة مالك وذهبك وفطرك بدقة وسهولة، وأدِ زكاتك في مصارفها',
  });

  const NISAB = {
    money: 85 * 30, // 85 grams of gold at ~30 OMR per gram
    gold: 85,
    fitr: 2.5,
  };

  const calculateMoneyZakat = () => {
    if (cashAmount >= NISAB.money) {
      return cashAmount * 0.025;
    }
    return 0;
  };

  const calculateGoldZakat = () => {
    if (goldWeight >= NISAB.gold) {
      return goldWeight * 30 * 0.025;
    }
    return 0;
  };

  const handleCalculate = () => {
    let result = 0;
    switch (activeTab) {
      case 'money':
        result = calculateMoneyZakat();
        break;
      case 'gold':
        result = calculateGoldZakat();
        break;
    }
    setZakatResult(result);
  };

  const handleReminderSave = () => {
    if (reminderEmail) {
      setReminderSaved(true);
      setTimeout(() => setReminderSaved(false), 3000);
    }
  };

  const handleDonateZakat = () => {
    navigate('/donate', { state: { zakatAmount: zakatResult } });
  };

  return (
    <div className="min-h-screen" dir="rtl">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-b from-[var(--brand-green)]/10 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Calculator className="w-16 h-16 mx-auto mb-6 text-[var(--brand-green)]" />
            <h1 className="text-5xl font-bold mb-6">حاسبة الزكاة الشرعية</h1>
            <p className="text-2xl text-gray-600 mb-4">
              احسب زكاتك بسهولة وأدها في مصارفها
            </p>
          </div>
        </div>
      </section>

      {/* Main Calculator */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Zakat Type Tabs */}
            <div className="flex gap-2 mb-8">
              {[
                { id: 'money', label: 'زكاة المال', icon: DollarSign },
                { id: 'gold', label: 'زكاة الذهب', icon: Gem },
                { id: 'fitr', label: 'زكاة الفطر', icon: Calendar },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ZakatType)}
                  className={`flex-1 p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-[var(--brand-green)] bg-[var(--brand-green)]/10 text-[var(--brand-green)]'
                      : 'border-gray-200 hover:border-[var(--brand-green)]'
                  }`}
                >
                  <tab.icon className="w-8 h-8" />
                  <span className="font-semibold">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Money Zakat */}
            {activeTab === 'money' && (
              <div className="card p-8">
                <h2 className="text-2xl font-bold mb-6">حساب زكاة المال</h2>
                
                <div className="mb-6">
                  <label className="block text-lg font-semibold mb-2">
                    إجمالي المبلغ المملوك (ر.ع)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={cashAmount}
                      onChange={(e) => setCashAmount(Number(e.target.value))}
                      className="w-full p-4 pr-12 border-2 border-gray-200 rounded-lg text-lg"
                      placeholder="أدخل المبلغ"
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">ر.ع</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <p className="text-sm text-gray-600">
                    نصاب الزكاة: {NISAB.money.toLocaleString()} ر.ع (ما يعادل 85 جرام ذهب)
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-[var(--brand-green)]" defaultChecked />
                    <span>بلغ المال النصاب</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-[var(--brand-green)]" defaultChecked />
                    <span>مر عليه عام هجري كامل</span>
                  </label>
                </div>

                <button onClick={handleCalculate} className="btn-primary w-full py-4 rounded-lg text-lg font-bold">
                  احسب الزكاة
                </button>
              </div>
            )}

            {/* Gold Zakat */}
            {activeTab === 'gold' && (
              <div className="card p-8">
                <h2 className="text-2xl font-bold mb-6">حساب زكاة الذهب</h2>
                
                <div className="mb-6">
                  <label className="block text-lg font-semibold mb-2">
                    وزن الذهب المملوك (جرام)
                  </label>
                  <input
                    type="number"
                    value={goldWeight}
                    onChange={(e) => setGoldWeight(Number(e.target.value))}
                    className="w-full p-4 border-2 border-gray-200 rounded-lg text-lg"
                    placeholder="أدخل الوزن بالجرام"
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <p className="text-sm text-gray-600">
                    نصاب الذهب: {NISAB.gold} جرام (سعر الجرام ~ 30 ر.ع)
                  </p>
                </div>

                <button onClick={handleCalculate} className="btn-primary w-full py-4 rounded-lg text-lg font-bold">
                  احسب الزكاة
                </button>
              </div>
            )}

            {/* Fitr Zakat */}
            {activeTab === 'fitr' && (
              <div className="card p-8">
                <h2 className="text-2xl font-bold mb-6">زكاة الفطر</h2>
                <div className="bg-gradient-to-r from-[var(--brand-green)]/10 to-[var(--brand-green)]/5 p-6 rounded-lg mb-6">
                  <p className="text-lg"><strong>مقدار زكاة الفطر:</strong> {NISAB.fitr} ر.ع للشخص الواحد</p>
                </div>
                
                <div className="mb-6">
                  <label className="block text-lg font-semibold mb-2">
                    عدد أفراد الأسرة
                  </label>
                  <input type="number" className="w-full p-4 border-2 border-gray-200 rounded-lg text-lg" placeholder="أدخل العدد" />
                </div>

                <button className="btn-primary w-full py-4 rounded-lg text-lg font-bold">
                  احسب الإجمالي
                </button>
              </div>
            )}

            {/* Zakat Result */}
            {zakatResult !== null && zakatResult > 0 && (
              <div className="card p-8 mt-6 border-[var(--brand-green)] border-2">
                <CheckCircle className="w-12 h-12 mx-auto mb-4 text-[var(--brand-green)]" />
                <h3 className="text-2xl font-bold text-center mb-2">قيمة الزكاة المستحقة</h3>
                <div className="text-5xl font-bold text-center text-[var(--brand-green)] mb-4">
                  {zakatResult.toFixed(2)}
                </div>
                <p className="text-center text-gray-600 mb-6">ريال عماني</p>
                <button 
                  onClick={handleDonateZakat}
                  className="btn-primary w-full py-4 rounded-lg text-lg font-bold flex items-center justify-center gap-2"
                >
                  أخرج زكاتك الآن
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>
            )}

            {zakatResult === 0 && zakatResult !== null && (
              <div className="card p-8 mt-6">
                <p className="text-center text-lg">
                  المبلغ المملوك لم يبلغ النصاب الشرعي، لا تجب عليك الزكاة.
                </p>
              </div>
            )}

            {/* Reminder Tool */}
            <div className="card p-8 mt-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Bell className="w-6 h-6 text-[var(--brand-green)]" />
                تذكير بموعد الزكاة
              </h3>
              <p className="text-gray-600 mb-4">
                أدخل بريدك الإلكتروني أو هاتفك ليتم تذكيرك في نفس التاريخ الهجري من العام القادم
              </p>
              <div className="flex gap-3">
                <input
                  type="email"
                  value={reminderEmail}
                  onChange={(e) => setReminderEmail(e.target.value)}
                  className="flex-1 p-4 border-2 border-gray-200 rounded-lg"
                  placeholder="البريد الإلكتروني"
                />
                <button
                  onClick={handleReminderSave}
                  className="btn-primary px-6 py-4 rounded-lg"
                >
                  {reminderSaved ? 'تم الحفظ ✅' : 'تذكير'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
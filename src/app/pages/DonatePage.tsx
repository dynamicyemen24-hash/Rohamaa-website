// Donate Page - صفحة التبرع
import { Heart, CreditCard, Wallet, Building2, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSEO } from '@/utils/seoAdvanced';

export default function DonatePage() {
  const navigate = useNavigate();
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [selectedProject, setSelectedProject] = useState('general');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useSEO({
    title: 'تبرع الآن - رحماء بينهم',
    description: 'ساهم في دعم المشاريع الخيرية والإنسانية',
  });

  const projects = [
    { id: 'general', name: 'تبرع عام', icon: '❤️' },
    { id: 'food', name: 'السلال الغذائية', icon: '🍚' },
    { id: 'water', name: 'مشروع الآبار', icon: '💧' },
    { id: 'education', name: 'التعليم والقرآن', icon: '📚' },
    { id: 'orphans', name: 'كفالة الأيتام', icon: '👶' },
    { id: 'zakat', name: 'زكاة المال', icon: '💰' },
    { id: 'sacrifice', name: 'الأضاحي', icon: '🐑' },
    { id: 'winter', name: 'دفء الشتاء', icon: '🧥' },
  ];

  const paymentMethods = [
    { id: 'card', name: 'بطاقة ائتمان', icon: CreditCard },
    { id: 'apple', name: 'Apple Pay', icon: Wallet },
    { id: 'google', name: 'Google Pay', icon: Wallet },
    { id: 'bank', name: 'تحويل بنكي', icon: Building2 },
  ];

  const presetAmounts = [25, 50, 100, 250, 500, 1000];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSuccess(true);
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl">
        <div className="card p-12 max-w-2xl mx-auto text-center">
          <CheckCircle className="w-20 h-20 mx-auto mb-6 text-[var(--brand-green)]" />
          <h1 className="text-4xl font-bold mb-4">شكراً لك!</h1>
          <p className="text-xl text-gray-600 mb-8">
            تم استلام تبرعك بنجاح. نسأل الله أن يتقبل منا ومنكم.
          </p>
          <div className="space-y-4">
            <button onClick={() => navigate('/')} className="btn-primary px-8 py-3 rounded-lg">
              العودة للرئيسية
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Heart className="w-16 h-16 mx-auto mb-4 text-[var(--brand-green)]" />
            <h1 className="text-5xl font-bold mb-4">تبرع الآن</h1>
            <p className="text-xl text-gray-600">أثرك يبدأ من هنا</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="card p-8 md:p-12">
              {/* Project Selection */}
              <div className="mb-8">
                <label className="block text-lg font-semibold mb-4">اختر المشروع</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {projects.map((project) => (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => setSelectedProject(project.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedProject === project.id
                          ? 'border-[var(--brand-green)] bg-[var(--brand-green)]/10'
                          : 'border-gray-200 hover:border-[var(--brand-green)]'
                      }`}
                    >
                      <div className="text-3xl mb-2">{project.icon}</div>
                      <div className="text-sm font-semibold">{project.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Selection */}
              <div className="mb-8">
                <label className="block text-lg font-semibold mb-4">قيمة التبرع (ر.ع)</label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                  {presetAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setSelectedAmount(amount)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedAmount === amount
                          ? 'border-[var(--brand-green)] bg-[var(--brand-green)] text-white'
                          : 'border-gray-200 hover:border-[var(--brand-green)]'
                      }`}
                    >
                      {amount}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  value={selectedAmount}
                  onChange={(e) => setSelectedAmount(Number(e.target.value))}
                  className="w-full p-4 border-2 border-gray-200 rounded-lg text-lg"
                  placeholder="أدخل مبلغ آخر"
                />
              </div>

              {/* Payment Method */}
              <div className="mb-8">
                <label className="block text-lg font-semibold mb-4">طريقة الدفع</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                        paymentMethod === method.id
                          ? 'border-[var(--brand-green)] bg-[var(--brand-green)]/10'
                          : 'border-gray-200 hover:border-[var(--brand-green)]'
                      }`}
                    >
                      <method.icon className="w-8 h-8" />
                      <span className="text-sm font-semibold">{method.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Donor Information */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">معلومات المتبرع</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={donorInfo.name}
                    onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
                    className="w-full p-4 border-2 border-gray-200 rounded-lg"
                    placeholder="الاسم الكامل"
                    required
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="email"
                      value={donorInfo.email}
                      onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                      className="w-full p-4 border-2 border-gray-200 rounded-lg"
                      placeholder="البريد الإلكتروني"
                      required
                    />
                    <input
                      type="tel"
                      value={donorInfo.phone}
                      onChange={(e) => setDonorInfo({ ...donorInfo, phone: e.target.value })}
                      className="w-full p-4 border-2 border-gray-200 rounded-lg"
                      placeholder="رقم الهاتف"
                      required
                    />
                  </div>
                  <textarea
                    value={donorInfo.message}
                    onChange={(e) => setDonorInfo({ ...donorInfo, message: e.target.value })}
                    className="w-full p-4 border-2 border-gray-200 rounded-lg"
                    placeholder="رسالة اختيارية"
                    rows={3}
                  />
                </div>
              </div>

              {/* Payment Summary */}
              <div className="bg-gradient-to-r from-[var(--brand-green)]/10 to-[var(--brand-green)]/5 p-6 rounded-lg mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg">المبلغ:</span>
                  <span className="text-2xl font-bold">{selectedAmount} ر.ع</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg">المشروع:</span>
                  <span className="text-lg font-semibold">
                    {projects.find(p => p.id === selectedProject)?.name}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-4 rounded-lg text-xl font-bold flex items-center justify-center gap-2"
              >
                <Heart className="w-6 h-6" />
                {isSubmitting ? 'جاري المعالجة...' : `تبرع الآن - ${selectedAmount} ر.ع`}
              </button>

              {/* Security Badge */}
              <div className="mt-6 text-center text-sm text-gray-600">
                <p>🔒 دفع آمن ومشفر بتقنية SSL</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
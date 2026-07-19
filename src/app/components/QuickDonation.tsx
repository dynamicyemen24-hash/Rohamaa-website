// Quick Donation Component - Interactive Impact Calculator with Inline Payment
import { Heart, Users, Globe, GraduationCap, Droplets, Package, CreditCard, Smartphone, Banknote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

import { useSEO } from "@/utils/seoAdvanced";

interface QuickDonationProps {
  readonly onClose?: () => void;
  readonly embedded?: boolean;
}

interface ImpactResult {
  beneficiaries: number;
  meals: number;
  waterDays: number;
  educationDays: number;
  orphansSupported: number;
}

// Project impact multipliers
const IMPACT_MULTIPLIERS: Record<string, (amount: number) => ImpactResult> = {
  general: (amount) => ({
    beneficiaries: Math.floor(amount / 15),
    meals: Math.floor(amount / 2),
    waterDays: 0,
    educationDays: 0,
    orphansSupported: 0,
  }),
  food: (amount) => ({
    beneficiaries: Math.floor(amount / 10),
    meals: Math.floor(amount / 1.5),
    waterDays: 0,
    educationDays: 0,
    orphansSupported: 0,
  }),
  water: (amount) => ({
    beneficiaries: 0,
    meals: 0,
    waterDays: Math.floor(amount / 25), // One water well day costs ~25 OMR
    educationDays: 0,
    orphansSupported: 0,
  }),
  education: (amount) => ({
    beneficiaries: 0,
    meals: 0,
    waterDays: 0,
    educationDays: Math.floor(amount / 30),
    orphansSupported: 0,
  }),
  orphans: (amount) => ({
    beneficiaries: 0,
    meals: 0,
    waterDays: 0,
    educationDays: 0,
    orphansSupported: Math.floor(amount / 100),
  }),
  zakat: (amount) => ({
    beneficiaries: Math.floor(amount / 5),
    meals: Math.floor(amount / 2),
    waterDays: 0,
    educationDays: 0,
    orphansSupported: 0,
  }),
};

const PROJECTS = [
  { id: "general", label: "الصندوق العام", icon: Heart, description: "مساهمة عامة في جميع برامج المؤسسة" },
  { id: "food", label: "السلال الغذائية", icon: Package, description: "توفير سلال غذائية للأسر المحتاجة" },
  { id: "water", label: "مشروع الآبار", icon: Droplets, description: "حفر آبار وتوفير مياه شرب نظيفة" },
  { id: "education", label: "التعليم والقرآن", icon: GraduationCap, description: "دعم التعليم وتحفيز القرآن" },
  { id: "orphans", label: "كفالة الأيتام", icon: Users, description: "رعاية يتيم في التعليم والصحة" },
  { id: "zakat", label: "زكاة المال", icon: Banknote, description: "صرف الزكاة في مصارفها الشرعية" },
];

const PAYMENT_METHODS = [
  { id: "card", label: "بطاقة ائتمان", icon: CreditCard },
  { id: "apple", label: "Apple Pay", icon: CreditCard },
  { id: "google", label: "Google Pay", icon: CreditCard },
  { id: "mobile", label: "محفظة إلكترونية", icon: Smartphone },
  { id: "transfer", label: "تحويل بنكي", icon: Banknote },
];

export function QuickDonation({ onClose, embedded = false }: QuickDonationProps) {
  const [amount, setAmount] = useState(50);
  const [selectedProject, setSelectedProject] = useState("general");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [impact, setImpact] = useState<ImpactResult>({
    beneficiaries: 0,
    meals: 0,
    waterDays: 0,
    educationDays: 0,
    orphansSupported: 0,
  });
  const [isProcessing, setIsProcessing] = useState(false);

  useSEO({
    title: "تبرع سريع - رحماء بينهم",
    description: "تبرع بسهولة وأثر مباشر في مشاريع المؤسسة",
  });

  useEffect(() => {
    const multiplier = IMPACT_MULTIPLIERS[selectedProject] || IMPACT_MULTIPLIERS.general;
    setImpact(multiplier(amount));
  }, [amount, selectedProject]);

  const handleDonate = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    // In real implementation, integrate with payment gateway
  };

  const presetAmounts = [10, 25, 50, 100, 250, 500, 1000];

  const content = (
    <div className="max-w-2xl mx-auto" dir="rtl">
      <div className="text-center mb-8">
        <Heart className="w-16 h-16 mx-auto mb-4 text-[var(--brand-green)]" />
        <h2 className="text-3xl font-bold mb-2">تبرع سريع وأثر مباشر</h2>
        <p className="text-gray-600">اختر المشروع وحساب أثر تبرعك قبل الدفع</p>
      </div>

      <div className="card p-8">
{/* Project Selection */}
        <div className="mb-6" role="group" aria-label="اختر المشروع">
          <span className="block text-lg font-semibold mb-3">اختر المشروع</span>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {PROJECTS.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project.id)}
                className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                  selectedProject === project.id
                    ? "border-[var(--brand-green)] bg-[var(--brand-green-pale)]"
                    : "border-gray-200 hover:border-[var(--brand-green)]"
                }`}
                role="radio"
                aria-checked={selectedProject === project.id}
              >
                <project.icon className="w-8 h-8 text-[var(--brand-green)]" />
                <span className="text-sm font-medium">{project.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Amount Selection */}
        <div className="mb-6" role="group" aria-label="قيمة التبرع">
          <span className="block text-lg font-semibold mb-3">قيمة التبرع (ر.ع)</span>
          <div className="grid grid-cols-4 gap-2 mb-3">
            {presetAmounts.map((preset) => (
              <button
                key={preset}
                onClick={() => setAmount(preset)}
                className={`p-3 rounded-lg border transition-all ${
                  amount === preset
                    ? "border-[var(--brand-green)] bg-[var(--brand-green)] text-white"
                    : "border-gray-200 hover:border-[var(--brand-green)]"
                }`}
                role="radio"
                aria-checked={amount === preset}
              >
                {preset}
              </button>
            ))}
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full p-4 border-2 border-gray-200 rounded-lg text-lg focus:border-[var(--brand-green)]"
            placeholder="أو أدخل مبلغ آخر"
            min="1"
            max="10000"
          />
        </div>

        {/* Payment Method */}
        <div className="mb-8" role="group" aria-label="طريقة الدفع">
          <span className="block text-lg font-semibold mb-3">طريقة الدفع</span>
          <div className="flex gap-3">
            {PAYMENT_METHODS.map((method) => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`flex-1 p-3 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                  paymentMethod === method.id
                    ? "border-[var(--brand-green)] bg-[var(--brand-green-pale)]"
                    : "border-gray-200"
                }`}
              >
                <method.icon className="w-5 h-5" />
                <span className="text-sm">{method.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Impact Calculator */}
        <div className="bg-gradient-to-r from-[var(--brand-green)]/5 to-[var(--brand-gold)]/5 p-6 rounded-lg mb-8">
          <h3 className="text-xl font-bold mb-4 text-center">أثر تبرعك</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {impact.beneficiaries > 0 && (
              <div className="text-center">
                <Users className="w-10 h-10 mx-auto mb-2 text-[var(--brand-green)]" />
                <div className="text-2xl font-bold">{impact.beneficiaries}</div>
                <div className="text-sm text-gray-600">مستفيد</div>
              </div>
            )}
            {impact.meals > 0 && (
              <div className="text-center">
                <Package className="w-10 h-10 mx-auto mb-2 text-[var(--brand-green)]" />
                <div className="text-2xl font-bold">{impact.meals}</div>
                <div className="text-sm text-gray-600">وجبة غذائية</div>
              </div>
            )}
            {impact.waterDays > 0 && (
              <div className="text-center">
                <Droplets className="w-10 h-10 mx-auto mb-2 text-[var(--brand-green)]" />
                <div className="text-2xl font-bold">{impact.waterDays}</div>
                <div className="text-sm text-gray-600">يوم مياه نظيفة</div>
              </div>
            )}
            {impact.educationDays > 0 && (
              <div className="text-center">
                <GraduationCap className="w-10 h-10 mx-auto mb-2 text-[var(--brand-green)]" />
                <div className="text-2xl font-bold">{impact.educationDays}</div>
                <div className="text-sm text-gray-600">يوم تعليم</div>
              </div>
            )}
            {impact.orphansSupported > 0 && (
              <div className="text-center">
                <Users className="w-10 h-10 mx-auto mb-2 text-[var(--brand-green)]" />
                <div className="text-2xl font-bold">{impact.orphansSupported}</div>
                <div className="text-sm text-gray-600">يتيم مكفول</div>
              </div>
            )}
          </div>
        </div>

        {/* Donate Button */}
        <motion.button
          onClick={handleDonate}
          disabled={isProcessing}
          className="w-full btn-primary py-4 rounded-lg text-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              جاري المعالجة...
            </>
          ) : (
            <>
              <Heart className="w-6 h-6" fill="white" />
              تبرع الآن - {amount} ر.ع
            </>
          )}
        </motion.button>
      </div>
    </div>
  );

  if (embedded) {
    return content;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-h-[90vh] overflow-y-auto relative w-full max-w-3xl">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-lg hover:bg-gray-100"
        >
          ✕
        </button>
        <div className="p-6">{content}</div>
      </div>
    </div>
  );
}
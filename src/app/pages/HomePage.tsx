// Homepage - Rohamaa Campaign Home Page
// Enhanced with high-quality visual elements, hero video, live counters, quick donation
import { Heart, ArrowRight, Play, ChevronDown, Calculator } from 'lucide-react';
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { Contact } from '@/app/components/Contact';
import { GeoScopeMap } from '@/app/components/GeoScopeMap';
import { ImpactStats } from '@/app/components/ImpactStats';
import { Logo } from '@/app/components/Logo';
import { News } from '@/app/components/News';
import { Partners } from '@/app/components/Partners';
import { Programs } from '@/app/components/Programs';
import { QuickDonation } from '@/app/components/QuickDonation';
import { SuccessStories } from '@/app/components/SuccessStories';
import { useSEO } from '@/utils/seoAdvanced';


interface HomePageProps {
  setCurrentPage?: (page: string) => void;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function useCountUp(end: number, durationMs = 1400, started = false) {
  const [value, setValue] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!started) return;
    startRef.current = null;
    let raf = 0;

    const step = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const progress = Math.min((ts - startRef.current) / durationMs, 1);
      setValue(Math.floor(easeOutCubic(progress) * end));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [started, durationMs, end]);

  return value;
}

export default function HomePage({ setCurrentPage = () => {} }: HomePageProps) {
  // SEO
  useSEO({
    title: 'رحماء بينهم - منصة إغاثة وتنمية',
    description: 'حملة رحماء بينهم الخيرية - تضامن إنساني وتنموي متكامل',
    type: 'website',
    url: 'https://rbdcye.org',
  });

  const heroRef = useRef<HTMLDivElement | null>(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const node = heroRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeroVisible(true); },
      { threshold: 0.2 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const count1 = useCountUp(12847, 1600, heroVisible);
  const count2 = useCountUp(24, 1200, heroVisible);
  const count3 = useCountUp(48, 1300, heroVisible);

  return (
    <div className="min-h-screen" dir="rtl">
      {/* Hero Section - Enhanced with Video Support */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden">
        {/* Video Background */}
        <div className="hero-video-bg">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="https://images.unsplash.com/photo-1656416584402-b720e0d786dc?w=1920&h=1080&q=80&v=5"
            className="w-full h-full object-cover"
          >
            <source src="/videos/hero-background.mp4" type="video/mp4" />
          </video>
          <img
            src="https://images.unsplash.com/photo-1656416584402-b720e0d786dc?w=1920&h=1080&q=80&v=5"
            alt="مؤسسة رحماء بينهم - إغاثة وتنمية"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="hero-overlay" />

        {/* Content */}
        <div className="hero-content">
          <motion.div
            className="container mx-auto px-4 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo - Hero Style */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Logo size="xl" variant="hero" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              رحماء بينهم... <span className="hero-title-highlight">أثرٌ يدوم</span> مستقبلٌ <span className="hero-title-highlight">يُبنى</span>
            </motion.h1>

            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              مؤسسة رحماء بينهم منظمة إنسانية تنموية رائدة في اليمن، تعمل على تخفيف معاناة الأسرة اليمنية وتحقيق التنمية المستدامة عبر برامج متكاملة.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="hero-cta-group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <button
                onClick={() => setCurrentPage("donate")}
                className="hero-cta-primary"
              >
                <Heart className="w-5 h-5" fill="white" />
                تبرع الآن
              </button>
              <button
                onClick={() => document.getElementById('quick-donation')?.scrollIntoView({ behavior: 'smooth' })}
                className="hero-cta-secondary"
              >
                تبرع سريع
                <Calculator className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage("projects")}
                className="hero-cta-secondary"
              >
                <Play className="w-4 h-4" fill="white" />
                شاهد قصتنا
              </button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              className="hero-stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="hero-stat-item">
                <div className="hero-stat-value">+{count1.toLocaleString('ar-YE')}</div>
                <div className="hero-stat-label">مستفيد مباشر</div>
              </div>
              <div className="hero-stat-item">
                <div className="hero-stat-value">+{count2.toLocaleString('ar-YE')}</div>
                <div className="hero-stat-label">مشروع منجز</div>
              </div>
              <div className="hero-stat-item">
                <div className="hero-stat-value">+{count3.toLocaleString('ar-YE')}</div>
                <div className="hero-stat-label">شريك استراتيجي</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="hero-scroll-indicator">
          <span style={{ fontSize: "0.7rem" }}>اكتشف أكثر</span>
          <ChevronDown className="w-5 h-5" />
        </div>
      </section>

      {/* Live Impact Counters */}
      <ImpactStats />

      {/* Quick Donation Section - Enhanced */}
      <section id="quick-donation" className="py-20 bg-gradient-to-b from-white to-[var(--secondary)]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block mb-3 text-[var(--brand-gold)] border border-[var(--brand-gold)]/30 bg-[var(--brand-gold-pale)] px-4 py-1 rounded-full" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
                تبرع سريع وأثر مباشر
              </span>
              <h2 className="text-4xl font-bold mb-4">
                <span className="text-[var(--brand-green)]">أثرك يبدأ من هنا</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                اختر المشروع وحلّد تأثير تبرعك قبل الدفع، مع تبرع مباشر دون مغادرة الصفحة الرئيسية
              </p>
            </div>

            <QuickDonation embedded />
          </div>
        </div>
      </section>

      {/* GeoScope Map */}
      <GeoScopeMap setCurrentPage={setCurrentPage} />

      {/* Programs Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <Programs setCurrentPage={setCurrentPage} />
        </div>
      </section>

      {/* Success Stories */}
      <SuccessStories setCurrentPage={setCurrentPage} />

      {/* Partners */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <Partners setCurrentPage={setCurrentPage} />
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <News setCurrentPage={setCurrentPage} />
        </div>
      </section>

      {/* Contact Section */}
      <Contact setCurrentPage={setCurrentPage} />
    </div>
  );
}
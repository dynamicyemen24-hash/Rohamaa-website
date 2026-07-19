import { motion } from "framer-motion";
import { Quote, Heart, Star, Calendar, MapPin, Users, ArrowRight, BookOpen } from "lucide-react";

import { SEED_SUCCESS_STORIES } from "@/content/website";

export default function SuccessStoriesPage() {
  const stories = SEED_SUCCESS_STORIES.filter(s => s.status !== 'DRAFT');

  return (
    <div className="min-h-screen bg-[var(--background)] pt-20" dir="rtl">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-[var(--brand-green)] text-sm font-semibold bg-[var(--brand-green-pale)] px-4 py-1.5 rounded-full mb-4">
            <Heart className="w-4 h-4" />
            قصص النجاح
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4">
            قصص نجاح تُلهم
          </h1>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
            كل مشروع وراءه إنسان وكل رقم وراءه قصة نجاح تستحق أن تُروى
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-3xl overflow-hidden border border-[var(--border)] shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-56">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = '/favicon.svg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs text-white">
                  {story.year}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">{story.title}</h3>
                <p className="text-[var(--brand-green)] text-sm font-semibold mb-3">{story.program}</p>
                
                <Quote className="w-8 h-8 text-[var(--brand-green)]/20 mb-3" />
                <p className="text-[var(--muted-foreground)] text-sm leading-relaxed mb-4 line-clamp-3">
                  &#8220;{story.quote}&#8221;
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                  <div>
                    <p className="font-semibold text-[var(--foreground)]">{story.name}</p>
                    <p className="text-xs text-[var(--muted-foreground)] flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {story.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: story.rating || 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[var(--brand-gold)] text-[var(--brand-gold)]" />
                      ))}
                    </div>
                    <button
                      className="flex items-center gap-1 text-xs text-white bg-[var(--brand-green)] hover:bg-[var(--brand-green)]/90 px-3 py-1.5 rounded-full transition-all"
                      aria-label={`اقرأ قصة ${story.name}`}
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      اقرأ القصة
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {stories.length === 0 && (
          <div className="text-center py-16">
            <Users className="w-16 h-16 text-[var(--muted-foreground)] mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">لا توجد قصص نجاح متاحة حالياً</h3>
            <p className="text-[var(--muted-foreground)]">نحن نعمل على إضافة قصص النجاح الجديدة</p>
          </div>
        )}
      </div>
    </div>
  );
}
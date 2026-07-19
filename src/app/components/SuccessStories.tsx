import { motion } from "framer-motion";
import { ChevronLeft, Star, Sparkles, Loader2 } from "lucide-react";
import { useEffect, useState, memo } from "react";

import { SEED_SUCCESS_STORIES } from "@/content/website";
import { getSanityImageUrl } from "@/lib/sanity-helpers";
import { useDynamicContent } from "@/shared/hooks/useDynamicContent";

const StoryCard = memo(({ story, index, onNavigate }: { story: any; index: number; onNavigate: (id: string) => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group bg-white rounded-3xl overflow-hidden border border-[var(--border)] cursor-pointer hover:shadow-2xl transition-all duration-400"
      onClick={() => onNavigate(story.id)}
    >
      <div className="relative h-56 overflow-hidden">
        <img src={story.image} alt={story.name} loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder-person.jpg'; }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-sm text-white text-xs font-semibold shadow-lg">
            {story.program}
          </span>
        </div>
        {story.featured && (
          <div className="absolute top-4 left-4">
            <span className="px-2 py-1 rounded-lg bg-amber-500 text-white text-xs font-bold flex items-center gap-1"><Sparkles className="w-3 h-3" />مميز</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-[var(--foreground)] mb-2 line-clamp-1 font-bold text-lg">{story.name}</h3>
        <p className="text-[var(--muted-foreground)] text-sm mb-4 line-clamp-2 leading-relaxed">{story.quote}</p>
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {Array.from({ length: story.rating || 5 }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-[var(--brand-green)] font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
            اقرأ القصة <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </motion.div>
  );
});
StoryCard.displayName = 'StoryCard';

export const SuccessStories = ({ setCurrentPage = () => {} }: { setCurrentPage?: (p: string) => void }) => {
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { data: dynamicStories } = useDynamicContent<any>({ contentType: 'stories', enableRealtime: false });

  useEffect(() => {
    const formatted = dynamicStories?.length ? dynamicStories.map((s: any) => ({
      id: s._id, ...s, image: s.mainImage ? getSanityImageUrl(s.mainImage, 600, 400) : undefined
    })) : SEED_SUCCESS_STORIES.filter(s => s.status !== 'DRAFT');
    setStories(formatted);
    setLoading(false);
  }, [dynamicStories]);

  const navigate = (id: string) => setCurrentPage(`stories-${id}`);

  if (loading) return (
    <section className="py-24 bg-gradient-to-b from-[var(--background)] to-[var(--brand-green-pale)]/20 flex justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-[var(--brand-green)]" />
    </section>
  );

  return (
    <section className="py-24 bg-gradient-to-b from-[var(--background)] to-[var(--brand-green-pale)]/20" style={{ direction: "rtl" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-16">
          <motion.span initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full text-sm font-semibold mb-4 bg-[var(--brand-green-pale)] text-[var(--brand-green)] border border-[var(--brand-green)]/30">
            <Sparkles className="w-4 h-4" />قصص النجاح
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            قصص <span className="text-[var(--brand-green)]">تلهم وتُلهم</span>
          </h2>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">كل قصة وراءها إنسان تغير حياته بفضل دعمكم</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, i) => <StoryCard key={story.id} story={story} index={i} onNavigate={navigate} />)}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mt-16">
          <button onClick={() => setCurrentPage("stories")}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[var(--brand-green)] to-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95">
            <span>جميع القصص</span><ChevronLeft className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
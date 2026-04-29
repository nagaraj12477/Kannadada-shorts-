import { useState, useRef, useEffect } from 'react';
import { motion, PanInfo, AnimatePresence, useAnimation } from 'motion/react';
import NewsCard from './NewsCard';
import { NewsStory } from '../types';

interface SwipeFeedProps {
  stories: NewsStory[];
  onBookmark: (id: string) => void;
  bookmarkedIds: Set<string>;
}

export default function SwipeFeed({ stories, onBookmark, bookmarkedIds }: SwipeFeedProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const handleDragEnd = async (event: any, info: PanInfo) => {
    const threshold = 100; // swipe distance to trigger next news
    
    if (info.offset.y < -threshold && currentIndex < stories.length - 1) {
      // Swipe Up -> Next
      setCurrentIndex(prev => prev + 1);
    } else if (info.offset.y > threshold && currentIndex > 0) {
      // Swipe Down -> Prev
      setCurrentIndex(prev => prev - 1);
    }
  };

  if (stories.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-slate-400 bg-slate-950">
        ಯಾವುದೇ ಸುದ್ದಿಗಳು ಲಭ್ಯವಿಲ್ಲ...
      </div>
    );
  }

  return (
    <div 
      className="relative h-full w-full overflow-hidden bg-slate-950" 
      ref={containerRef}
      id="swipe-feed-container"
    >
      <AnimatePresence mode="wait">
        <motion.div
           key={stories[currentIndex].id}
           initial={{ y: 0 }}
           animate={{ y: 0 }}
           exit={{ y: 0 }}
           drag="y"
           dragConstraints={{ top: 0, bottom: 0 }}
           onDragEnd={handleDragEnd}
           className="h-full w-full touch-none cursor-grab active:cursor-grabbing"
           id={`swipe-story-${stories[currentIndex].id}`}
        >
          <NewsCard 
            story={stories[currentIndex]} 
            onBookmark={onBookmark}
            isBookmarked={bookmarkedIds.has(stories[currentIndex].id)}
          />
        </motion.div>
      </AnimatePresence>

      {/* Progress Indicator */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1 z-50">
        {stories.map((s, idx) => (
          <div 
            key={s.id}
            className={`w-1 h-8 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-red-500 h-12' : 'bg-slate-800'}`}
          />
        ))}
      </div>
    </div>
  );
}

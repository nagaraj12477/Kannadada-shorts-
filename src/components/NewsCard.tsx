import { motion, AnimatePresence } from 'motion/react';
import { Share2, Bookmark, ExternalLink } from 'lucide-react';
import { NewsStory } from '../types';

interface NewsCardProps {
  story: NewsStory;
  onBookmark?: (id: string) => void;
  isBookmarked?: boolean;
}

export default function NewsCard({ story, onBookmark, isBookmarked }: NewsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="h-full w-full bg-slate-950 flex flex-col overflow-hidden text-white"
      id={`news-card-${story.id}`}
    >
      {/* Image Section */}
      <div className="relative h-[45%] w-full">
        <img 
          src={story.imageUrl} 
          alt={story.title}
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="flex-1 px-6 pt-2 pb-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold font-sans tracking-tight mb-4 text-slate-100">
            {story.title}
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed font-light">
            {story.content}
          </p>
        </div>

        {/* Footer actions */}
        <div className="mt-6">
          <div className="flex items-center justify-between py-4 border-t border-slate-800">
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-1">Source</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-200">{story.source}</span>
                <a 
                  href={story.originalUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-red-400 transition-colors"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={() => onBookmark?.(story.id)}
                className={`p-2 rounded-full transition-colors ${isBookmarked ? 'bg-red-500 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
                id={`bookmark-btn-${story.id}`}
              >
                <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
              </button>
              <button 
                className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white transition-colors"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: story.title,
                      text: story.content,
                      url: story.originalUrl,
                    });
                  }
                }}
                id={`share-btn-${story.id}`}
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>

          <div className="mt-2 text-center">
            <span className="text-[10px] text-slate-600 uppercase tracking-[0.2em]">
              Swipe up for more • Tap for full story
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

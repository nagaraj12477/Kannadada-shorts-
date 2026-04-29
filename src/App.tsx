import { useState, useEffect } from 'react';
import { 
  Home, 
  TrendingUp, 
  BookMarked, 
  User as UserIcon, 
  Video, 
  Zap,
  Menu,
  ChevronRight
} from 'lucide-react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, signInWithGoogle } from './lib/firebase';
import { Category, NewsStory } from './types';
import { MOCK_NEWS } from './constants';
import SwipeFeed from './components/SwipeFeed';
import FinanceSection from './components/FinanceSection';
import { translateAndSummarizeToKannada } from './services/geminiService';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.MY_FEED);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [news, setNews] = useState<NewsStory[]>(MOCK_NEWS);
  const [isProcessingAI, setIsProcessingAI] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsub();
  }, []);

  const handleBookmark = (id: string) => {
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const currentStories = news.filter(s => 
    activeCategory === Category.MY_FEED ? true : s.category === activeCategory
  );

  const handleAIDemo = async () => {
    setIsProcessingAI(true);
    const engText = "SpaceX's Starship rocket has successfully completed another test flight, reaching orbit and returning safely. This marks a major milestone in Mars exploration efforts led by Elon Musk.";
    try {
      const result = await translateAndSummarizeToKannada(engText);
      const newStory: NewsStory = {
        id: Date.now().toString(),
        title: "SpaceX ಸ್ಟಾರ್‌ಶಿಪ್ ಪರೀಕ್ಷಾರ್ಥ ಹಾರಾಟ ಯಶಸ್ವಿ",
        content: result,
        imageUrl: "https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=1000",
        originalUrl: "https://spacex.com",
        source: "AI Summary (Tech News)",
        category: Category.MY_FEED,
        publishedAt: new Date().toISOString(),
        trendingScore: 100
      };
      setNews(prev => [newStory, ...prev]);
      setActiveCategory(Category.MY_FEED);
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessingAI(false);
    }
  };

  return (
    <div className="h-screen w-full bg-slate-950 flex flex-col max-w-md mx-auto relative shadow-2xl border-x border-slate-900 overflow-hidden font-sans">
      
      {/* Header */}
      <header className="px-4 py-4 flex items-center justify-between border-b border-slate-900 bg-slate-950/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
            <Zap size={20} className="text-white fill-white" />
          </div>
          <h1 className="text-xl font-bold italic tracking-tighter text-slate-100">KANNADA SHORTS</h1>
        </div>
        <div className="flex items-center gap-3">
          {isProcessingAI && (
            <motion.div 
               animate={{ rotate: 360 }} 
               transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
               className="text-red-500"
            >
              <Zap size={20} />
            </motion.div>
          )}
          {currentUser ? (
            <img 
              src={currentUser.photoURL || ''} 
              alt="profile" 
              className="w-8 h-8 rounded-full border border-slate-800"
            />
          ) : (
            <button 
              onClick={() => signInWithGoogle()}
              className="p-2 text-slate-400 hover:text-white transition-colors"
              id="login-btn"
            >
              <UserIcon size={20} />
            </button>
          )}
        </div>
      </header>

      {/* Category Tabs (Horizontal Scroll) */}
      <nav className="flex overflow-x-auto px-4 py-3 gap-6 border-b border-slate-900 scrollbar-hide bg-slate-950">
        {Object.values(Category).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap text-sm font-bold transition-all duration-200 capitalize tracking-wide ${
              activeCategory === cat ? 'text-red-500 scale-105' : 'text-slate-500 hover:text-slate-300'
            }`}
            id={`tab-${cat}`}
          >
            {cat.replace('_', ' ')}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeCategory === Category.FINANCE ? (
            <motion.div 
              key="finance"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="h-full"
            >
              <FinanceSection />
            </motion.div>
          ) : (
            <motion.div 
              key="feed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full"
            >
              <SwipeFeed 
                stories={currentStories} 
                onBookmark={handleBookmark} 
                bookmarkedIds={bookmarkedIds}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* AI Action FAB */}
      <button 
        onClick={handleAIDemo}
        disabled={isProcessingAI}
        className="absolute bottom-24 right-4 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-900/40 hover:bg-red-500 transition-all active:scale-95 disabled:opacity-50 z-50 group"
        id="ai-summarize-btn"
        title="AI Summarize Demo"
      >
        <Zap size={24} className="text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Navigation */}
      <footer className="bg-slate-900/90 backdrop-blur-xl border-t border-slate-800 px-8 py-3 flex justify-between items-center z-50">
        <button 
          className={`p-2 rounded-xl transition-all ${activeCategory === Category.MY_FEED ? 'bg-red-500/10 text-red-500' : 'text-slate-500'}`}
          onClick={() => setActiveCategory(Category.MY_FEED)}
        >
          <Home size={24} />
        </button>
        <button 
          className={`p-2 rounded-xl transition-all ${activeCategory === Category.FINANCE ? 'bg-red-500/10 text-red-500' : 'text-slate-500'}`}
          onClick={() => setActiveCategory(Category.FINANCE)}
        >
          <TrendingUp size={24} />
        </button>
        <button className="p-2 text-slate-500 hover:text-red-500 transition-colors">
          <Video size={24} />
        </button>
        <button className="p-2 text-slate-500 hover:text-red-500 transition-colors">
          <BookMarked size={24} />
        </button>
      </footer>
    </div>
  );
}

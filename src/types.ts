export enum Category {
  MY_FEED = 'my_feed',
  FINANCE = 'finance',
  TIMELINES = 'timelines',
  INSIGHTS = 'insights',
  VIDEOS = 'videos'
}

export interface NewsStory {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  originalUrl: string;
  source: string;
  category: Category;
  publishedAt: string;
  trendingScore: number;
  videoUrl?: string;
}

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  bookmarks: string[];
  interests: string[];
}

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  history: { date: string; price: number }[];
}

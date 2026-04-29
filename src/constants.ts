import { Category, NewsStory } from './types';

export const MOCK_NEWS: NewsStory[] = [
  {
    id: '1',
    title: 'ಬೆಂಗಳೂರಿನಲ್ಲಿ ಹೊಸ ಮೆಟ್ರೋ ಲೈನ್ ಉದ್ಘಾಟನೆ',
    content: 'ಬೆಂಗಳೂರಿನ ನಮ್ಮ ಮೆಟ್ರೋ ಜಾಲಕ್ಕೆ ಇಂದು ಹೊಸ ಲೈನ್ ಸೇರ್ಪಡೆಯಾಗಿದೆ. ಮುಖ್ಯಮಂತ್ರಿಗಳು ಈ ಯೋಜನೆಯನ್ನು ಉದ್ಘಾಟಿಸಿದ್ದು, ಇದು ನಗರದ ಸಂಚಾರ ದಟ್ಟಣೆಯನ್ನು ಕಡಿಮೆ ಮಾಡುವ ನಿರೀಕ್ಷೆಯಿದೆ. ಈ ಲೈನ್ ನಗರದ ಐಟಿ ಜಿಲ್ಲೆಗೆ ನೇರ ಸಂಪರ್ಕವನ್ನು ಒದಗಿಸುತ್ತದೆ.',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000',
    originalUrl: 'https://example.com/news1',
    source: 'Kannada Prabha',
    category: Category.MY_FEED,
    publishedAt: new Date().toISOString(),
    trendingScore: 95
  },
  {
    id: '2',
    title: 'ಚಿನ್ನದ ಬೆಲೆಯಲ್ಲಿ ಭಾರಿ ಕುಸಿತ',
    content: 'ಜಾಗತಿಕ ಮಾರುಕಟ್ಟೆಯಲ್ಲಿನ ಏರಿಳಿತಗಳ ಪರಿಣಾಮವಾಗಿ ಇಂದು ಭಾರತದಲ್ಲಿ ಚಿನ್ನದ ಬೆಲೆ ಗಣನೀಯವಾಗಿ ಇಳಿಕೆಯಾಗಿದೆ. ಹೂಡಿಕೆದಾರರು ಈ ಸಮಯವನ್ನು ಖರೀದಿಗಾಗಿ ಬಳಸಿಕೊಳ್ಳುವ ಸಾಧ್ಯತೆಯಿದೆ. ಬೆಳ್ಳಿ ಬೆಲೆಯಲ್ಲಿಯೂ ಕೂಡ ಸ್ವಲ್ಪ ಮಟ್ಟಿನ ಇಳಿಕೆ ಕಂಡುಬಂದಿದೆ.',
    imageUrl: 'https://images.unsplash.com/photo-1584441401311-2058440c9462?q=80&w=1000',
    originalUrl: 'https://example.com/news2',
    source: 'Vijaya Karnataka',
    category: Category.FINANCE,
    publishedAt: new Date().toISOString(),
    trendingScore: 88
  },
  {
    id: '3',
    title: 'ಐಟಿ ವಲಯದಲ್ಲಿ ಹೊಸ ಉದ್ಯೋಗಾವಕಾಶಗಳು',
    content: 'ಮುಂದಿನ ತ್ರೈಮಾಸಿಕದಲ್ಲಿ ಪ್ರಮುಖ ಐಟಿ ಕಂಪನಿಗಳು ಸಾವಿರಾರು ಪದವೀಧರರನ್ನು ನೇಮಿಸಿಕೊಳ್ಳಲು ಯೋಜಿಸಿವೆ. ಆರ್ಟಿಫಿಶಿಯಲ್ ಇಂಟೆಲಿಜೆನ್ಸ್ ಮತ್ತು ಡೇಟಾ ಸೈನ್ಸ್ ವಿಭಾಗಗಳಲ್ಲಿ ಹೆಚ್ಚಿನ ಬೇಡಿಕೆಯಿದೆ ಎಂದು ತಜ್ಞರು ತಿಳಿಸಿದ್ದಾರೆ.',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000',
    originalUrl: 'https://example.com/news3',
    source: 'Hills News',
    category: Category.INSIGHTS,
    publishedAt: new Date().toISOString(),
    trendingScore: 92
  }
];

export const MOCK_STOCKS = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2850.50, change: 15.20, changePercent: 0.54 },
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3950.00, change: -22.40, changePercent: -0.56 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1450.75, change: 5.10, changePercent: 0.35 },
  { symbol: 'INFY', name: 'Infosys Ltd', price: 1620.30, change: 12.80, changePercent: 0.80 },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 1080.40, change: -3.20, changePercent: -0.30 }
];

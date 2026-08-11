export interface SocialPost {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm format, 24h
  endTime: string;
  platforms: ('instagram' | 'facebook' | 'twitter' | 'tiktok')[];
}

export const MOCK_SOCIAL_POSTS: SocialPost[] = [
  {
    id: "p1",
    title: "Post Title",
    date: "2025-10-27",
    startTime: "12:30",
    endTime: "13:30",
    platforms: ["instagram", "facebook"]
  },
  {
    id: "p2",
    title: "Weekend Promo",
    date: "2025-10-31",
    startTime: "09:00",
    endTime: "10:00",
    platforms: ["instagram"]
  },
  {
    id: "p3",
    title: "New Stylist Announce",
    date: "2025-09-02", 
    startTime: "12:30",
    endTime: "13:00",
    platforms: ["instagram", "facebook"]
  }
];

export interface AnalyticsMetric {
  title: string;
  value: string;
  change: string; // e.g., "+9%"
  trend: 'up' | 'down';
  chartData: number[]; // mini sparkline data
}

export const MOCK_ANALYTICS_METRICS: AnalyticsMetric[] = [
  { title: "Followers (Total)", value: "200", change: "+9%", trend: "up", chartData: [30, 40, 20, 80, 50, 40] },
  { title: "Accounts Reached in Period", value: "345", change: "+9%", trend: "up", chartData: [40, 30, 80, 50, 60, 40] },
  { title: "Profile Views", value: "3.345", change: "+9%", trend: "up", chartData: [30, 50, 40, 90, 60, 40] },
  { title: "Website Button Taps", value: "10k", change: "+9%", trend: "up", chartData: [20, 60, 30, 100, 50, 60] },
  { title: "Email Button Taps", value: "10k", change: "+9%", trend: "up", chartData: [50, 40, 30, 80, 40, 50] },
  { title: "Call Button Taps", value: "345", change: "+9%", trend: "up", chartData: [30, 40, 50, 90, 40, 60] },
  { title: "Text Button Taps", value: "3.345", change: "+9%", trend: "up", chartData: [40, 30, 60, 80, 50, 70] },
  { title: "Get Directions Taps", value: "10k", change: "+9%", trend: "up", chartData: [30, 50, 40, 100, 60, 50] },
];

export const MOCK_AUDIENCE_GENDER_AGE = [
  { ageGroup: '18-24', man: 70, woman: 58, unspecified: 42 },
  { ageGroup: '25-34', man: 70, woman: 58, unspecified: 42 },
  { ageGroup: '35-44', man: 70, woman: 58, unspecified: 42 },
  { ageGroup: '45-54', man: 70, woman: 58, unspecified: 42 },
  { ageGroup: '55-64', man: 70, woman: 58, unspecified: 42 },
  { ageGroup: '65+', man: 70, woman: 58, unspecified: 42 },
];

export const MOCK_AUDIENCE_CITY = [
  { city: 'Rome', percentage: 20 },
  { city: 'Milan', percentage: 20 },
  { city: 'Naples', percentage: 20 },
  { city: 'Turin', percentage: 20 },
  { city: 'Florence', percentage: 20 },
];

export const MOCK_FOLLOWERS_ACTIVE = [
  { day: 'Sunday', value: 30 },
  { day: 'Monday', value: 35 },
  { day: 'Tuesday', value: 40 },
  { day: 'Wednesday', value: 35 },
  { day: 'Thursday', value: 35 },
  { day: 'Friday', value: 35 },
  { day: 'Saturday', value: 45 },
];

export interface AnalyticsPostRow {
  id: string;
  thumbnail: string;
  title: string;
  date: string;
  type: 'Link' | 'Photo' | 'Gif' | 'Carousel' | 'Video';
  views: string;
  accountsReached: string;
  totalInteractions: string;
  likes: string;
  comments: string;
  saves: string;
  shares: string;
  videoViews: string;
  watchTime: string;
  engagementCarousel: string;
  reachCarousel: string;
  swipesForward: string;
  swipesBackward: string;
}

export const MOCK_ANALYTICS_POSTS: AnalyticsPostRow[] = Array.from({ length: 15 }).map((_, i) => {
  const types: ('Link' | 'Photo' | 'Gif' | 'Carousel' | 'Video')[] = ['Link', 'Photo', 'Gif', 'Carousel', 'Video'];
  return {
    id: `post-${i}`,
    thumbnail: 'https://via.placeholder.com/40',
    title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    date: 'Wed, 12 Oct at 11:01',
    type: types[i % types.length],
    views: '2.3k',
    accountsReached: '1.3k',
    totalInteractions: '1.3k',
    likes: '1k',
    comments: '300',
    saves: '500',
    shares: '1.3k',
    videoViews: i % 5 === 4 ? '2.3k' : '-',
    watchTime: i % 5 === 4 ? '20 seconds' : '-',
    engagementCarousel: i % 5 === 3 ? '2k' : '-',
    reachCarousel: i % 5 === 3 ? '2k' : '-',
    swipesForward: i % 5 === 3 ? '500' : '500', // screenshot shows 500 across the board mostly
    swipesBackward: '1.3k',
  };
});

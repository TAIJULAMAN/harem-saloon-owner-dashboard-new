export interface MediaItem {
  id: string;
  fileName: string;
  type: "photo" | "video";
  uploadedBy: string;
  uploadedAt: string;
  published: boolean;
  src: string;
  videoUrl?: string;
}

export interface MediaSession {
  id: string;
  date: string;
  clientName: string;
  clientSubtext: string;
  services: string[];
  managedBy: string;
  items: MediaItem[];
}

export const MOCK_SESSIONS: MediaSession[] = [
  { id: "9e0dd938", date: "11/08/2026", clientName: "Maria Rodriguez", clientSubtext: "xxxx", services: ["Facial Care", "Massage Therapy"], managedBy: "Carol Martinez, Bob Chen", items: [{ id: "1", fileName: "FileName.jpeg", type: "photo", uploadedBy: "Maria Rodriguez", uploadedAt: "08/08/2025 5:06 PM", published: true, src: "/thumbnail/t1.jpg" }, { id: "2", fileName: "YouTube Setup", type: "video", uploadedBy: "John Smith", uploadedAt: "08/08/2025 5:06 PM", published: false, src: "https://img.youtube.com/vi/gRD_hmtLROE/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/gRD_hmtLROE?autoplay=1" }, { id: "yt2", fileName: "YouTube Demo", type: "video", uploadedBy: "Maria Rodriguez", uploadedAt: "08/08/2025 5:10 PM", published: true, src: "https://img.youtube.com/vi/6Db-cEgbmC4/hqdefault.jpg", videoUrl: "https://www.youtube.com/embed/6Db-cEgbmC4?autoplay=1" }] },
  { id: "3b2c1a99", date: "10/22/2026", clientName: "John Smith", clientSubtext: "Men's grooming", services: ["Facial Care"], managedBy: "Bob Chen", items: [{ id: "3", fileName: "vid1.mp4", type: "video", uploadedBy: "John Smith", uploadedAt: "10/22/2026 10:00 AM", published: false, src: "/thumbnail/t1.jpg" }] },
  { id: "8f7e6d5c", date: "09/15/2026", clientName: "Sarah Johnson", clientSubtext: "Bridal makeup trial", services: ["Facial Care", "Eyebrow Shaping"], managedBy: "Carol Martinez", items: [{ id: "4", fileName: "bridal1.jpeg", type: "photo", uploadedBy: "Sarah Johnson", uploadedAt: "09/15/2026 2:30 PM", published: true, src: "/thumbnail/t1.jpg" }, { id: "5", fileName: "bridal2.jpeg", type: "photo", uploadedBy: "Sarah Johnson", uploadedAt: "09/15/2026 2:31 PM", published: true, src: "/thumbnail/t1.jpg" }] },
  { id: "4a5b6c7d", date: "08/01/2026", clientName: "Emma Davis", clientSubtext: "Regular manicure", services: ["Nail Art"], managedBy: "David Kumar", items: [{ id: "6", fileName: "nails.jpeg", type: "photo", uploadedBy: "Emma Davis", uploadedAt: "08/01/2026 11:15 AM", published: true, src: "/thumbnail/t1.jpg" }] },
  { id: "7a8b9c0d", date: "07/12/2026", clientName: "Olivia Taylor", clientSubtext: "Highlights and styling", services: ["Hair Treatment"], managedBy: "Alice Wilson", items: [{ id: "7", fileName: "hair1.jpeg", type: "photo", uploadedBy: "Olivia Taylor", uploadedAt: "07/12/2026 1:00 PM", published: true, src: "/thumbnail/t1.jpg" }, { id: "8", fileName: "hair2.mp4", type: "video", uploadedBy: "Alice Wilson", uploadedAt: "07/12/2026 1:15 PM", published: false, src: "/thumbnail/t1.jpg" }] },
  { id: "1b2c3d4e", date: "06/25/2026", clientName: "Sophia Brown", clientSubtext: "Full body massage", services: ["Massage Therapy"], managedBy: "Carol Martinez", items: [{ id: "9", fileName: "spa.jpeg", type: "photo", uploadedBy: "Sophia Brown", uploadedAt: "06/25/2026 4:45 PM", published: true, src: "/thumbnail/t1.jpg" }] },
  { id: "5e6f7g8h", date: "05/14/2026", clientName: "Isabella Wilson", clientSubtext: "Leg waxing", services: ["Waxing"], managedBy: "Bob Chen", items: [{ id: "10", fileName: "wax.jpeg", type: "photo", uploadedBy: "Bob Chen", uploadedAt: "05/14/2026 10:30 AM", published: false, src: "/thumbnail/t1.jpg" }] },
  { id: "9i0j1k2l", date: "04/03/2026", clientName: "Mia Moore", clientSubtext: "Acne facial", services: ["Facial Care"], managedBy: "David Kumar", items: [{ id: "11", fileName: "face1.mp4", type: "video", uploadedBy: "Mia Moore", uploadedAt: "04/03/2026 3:20 PM", published: true, src: "/thumbnail/t1.jpg" }, { id: "12", fileName: "face2.jpeg", type: "photo", uploadedBy: "David Kumar", uploadedAt: "04/03/2026 3:45 PM", published: true, src: "/thumbnail/t1.jpg" }] },
  { id: "3m4n5o6p", date: "03/18/2026", clientName: "Charlotte Anderson", clientSubtext: "Gel manicure", services: ["Nail Art"], managedBy: "Alice Wilson", items: [{ id: "13", fileName: "gel.jpeg", type: "photo", uploadedBy: "Charlotte Anderson", uploadedAt: "03/18/2026 9:00 AM", published: true, src: "/thumbnail/t1.jpg" }] },
  { id: "7q8r9s0t", date: "02/28/2026", clientName: "Amelia Thomas", clientSubtext: "Eyebrow threading", services: ["Eyebrow Shaping"], managedBy: "Carol Martinez", items: [{ id: "14", fileName: "brows.mp4", type: "video", uploadedBy: "Amelia Thomas", uploadedAt: "02/28/2026 11:45 AM", published: false, src: "/thumbnail/t1.jpg" }] },
  { id: "1u2v3w4x", date: "01/15/2026", clientName: "Harper Jackson", clientSubtext: "Deep tissue massage", services: ["Massage Therapy"], managedBy: "Bob Chen", items: [{ id: "15", fileName: "massage.jpeg", type: "photo", uploadedBy: "Harper Jackson", uploadedAt: "01/15/2026 2:15 PM", published: true, src: "/thumbnail/t1.jpg" }] },
  { id: "5y6z7a8b", date: "12/05/2025", clientName: "Evelyn White", clientSubtext: "Balayage", services: ["Hair Treatment"], managedBy: "David Kumar", items: [{ id: "16", fileName: "balayage1.jpeg", type: "photo", uploadedBy: "Evelyn White", uploadedAt: "12/05/2025 4:00 PM", published: true, src: "/thumbnail/t1.jpg" }, { id: "17", fileName: "balayage2.mp4", type: "video", uploadedBy: "David Kumar", uploadedAt: "12/05/2025 4:30 PM", published: true, src: "/thumbnail/t1.jpg" }] },
  { id: "9c0d1e2f", date: "11/20/2025", clientName: "Abigail Harris", clientSubtext: "Arm waxing", services: ["Waxing"], managedBy: "Alice Wilson", items: [{ id: "18", fileName: "arm.jpeg", type: "photo", uploadedBy: "Abigail Harris", uploadedAt: "11/20/2025 10:15 AM", published: false, src: "/thumbnail/t1.jpg" }] },
  { id: "3g4h5i6j", date: "10/31/2025", clientName: "Emily Martin", clientSubtext: "Halloween makeup", services: ["Facial Care", "Eyebrow Shaping"], managedBy: "Carol Martinez", items: [{ id: "19", fileName: "spooky.mp4", type: "video", uploadedBy: "Emily Martin", uploadedAt: "10/31/2025 6:00 PM", published: true, src: "/thumbnail/t1.jpg" }] },
  { id: "7k8l9m0n", date: "09/12/2025", clientName: "Elizabeth Thompson", clientSubtext: "Acrylic extensions", services: ["Nail Art"], managedBy: "Bob Chen", items: [{ id: "20", fileName: "acrylics.jpeg", type: "photo", uploadedBy: "Elizabeth Thompson", uploadedAt: "09/12/2025 1:45 PM", published: true, src: "/thumbnail/t1.jpg" }, { id: "21", fileName: "acrylics_video.mp4", type: "video", uploadedBy: "Bob Chen", uploadedAt: "09/12/2025 2:00 PM", published: true, src: "/thumbnail/t1.jpg" }] },
  { id: "1o2p3q4r", date: "08/25/2025", clientName: "Sofia Garcia", clientSubtext: "Anti-aging facial", services: ["Facial Care"], managedBy: "David Kumar", items: [{ id: "22", fileName: "antiaging.jpeg", type: "photo", uploadedBy: "Sofia Garcia", uploadedAt: "08/25/2025 3:30 PM", published: false, src: "/thumbnail/t1.jpg" }] },
  { id: "5s6t7u8v", date: "07/14/2025", clientName: "Avery Martinez", clientSubtext: "Hot stone massage", services: ["Massage Therapy"], managedBy: "Alice Wilson", items: [{ id: "23", fileName: "stones.mp4", type: "video", uploadedBy: "Avery Martinez", uploadedAt: "07/14/2025 11:00 AM", published: true, src: "/thumbnail/t1.jpg" }] },
  { id: "9w0x1y2z", date: "06/02/2025", clientName: "Ella Robinson", clientSubtext: "Keratin treatment", services: ["Hair Treatment"], managedBy: "Carol Martinez", items: [{ id: "24", fileName: "keratin.jpeg", type: "photo", uploadedBy: "Ella Robinson", uploadedAt: "06/02/2025 2:45 PM", published: true, src: "/thumbnail/t1.jpg" }] },
  { id: "3a4b5c6d", date: "05/19/2025", clientName: "Scarlett Clark", clientSubtext: "Full face threading", services: ["Eyebrow Shaping", "Waxing"], managedBy: "Bob Chen", items: [{ id: "25", fileName: "threading.mp4", type: "video", uploadedBy: "Scarlett Clark", uploadedAt: "05/19/2025 4:15 PM", published: false, src: "/thumbnail/t1.jpg" }, { id: "26", fileName: "threading2.jpeg", type: "photo", uploadedBy: "Bob Chen", uploadedAt: "05/19/2025 4:30 PM", published: true, src: "/thumbnail/t1.jpg" }] },
  { id: "7e8f9g0h", date: "04/08/2025", clientName: "Grace Rodriguez", clientSubtext: "Pedicure", services: ["Nail Art"], managedBy: "David Kumar", items: [{ id: "27", fileName: "pedi.jpeg", type: "photo", uploadedBy: "Grace Rodriguez", uploadedAt: "04/08/2025 10:00 AM", published: true, src: "/thumbnail/t1.jpg" }] },
  { id: "1i2j3k4l", date: "03/22/2025", clientName: "Chloe Lewis", clientSubtext: "Brightening facial", services: ["Facial Care"], managedBy: "Alice Wilson", items: [{ id: "28", fileName: "bright.jpeg", type: "photo", uploadedBy: "Chloe Lewis", uploadedAt: "03/22/2025 1:30 PM", published: true, src: "/thumbnail/t1.jpg" }] },
  { id: "5m6n7o8p", date: "02/10/2025", clientName: "Victoria Lee", clientSubtext: "Swedish massage", services: ["Massage Therapy"], managedBy: "Carol Martinez", items: [{ id: "29", fileName: "swedish.mp4", type: "video", uploadedBy: "Victoria Lee", uploadedAt: "02/10/2025 5:45 PM", published: false, src: "/thumbnail/t1.jpg" }] },
  { id: "9q0r1s2t", date: "01/30/2025", clientName: "Riley Walker", clientSubtext: "Bikini wax", services: ["Waxing"], managedBy: "Bob Chen", items: [{ id: "30", fileName: "waxing.jpeg", type: "photo", uploadedBy: "Riley Walker", uploadedAt: "01/30/2025 11:15 AM", published: true, src: "/thumbnail/t1.jpg" }, { id: "31", fileName: "waxing2.jpeg", type: "photo", uploadedBy: "Bob Chen", uploadedAt: "01/30/2025 11:30 AM", published: false, src: "/thumbnail/t1.jpg" }] },
  { id: "3u4v5w6x", date: "12/15/2024", clientName: "Aria Hall", clientSubtext: "Microblading", services: ["Eyebrow Shaping"], managedBy: "David Kumar", items: [{ id: "32", fileName: "micro.mp4", type: "video", uploadedBy: "Aria Hall", uploadedAt: "12/15/2024 3:00 PM", published: true, src: "/thumbnail/t1.jpg" }] },
  { id: "7y8z9a0b", date: "11/05/2024", clientName: "Lily Allen", clientSubtext: "Root touch up", services: ["Hair Treatment"], managedBy: "Alice Wilson", items: [{ id: "33", fileName: "roots.jpeg", type: "photo", uploadedBy: "Lily Allen", uploadedAt: "11/05/2024 9:30 AM", published: true, src: "/thumbnail/t1.jpg" }, { id: "34", fileName: "roots_vid.mp4", type: "video", uploadedBy: "Alice Wilson", uploadedAt: "11/05/2024 10:00 AM", published: true, src: "/thumbnail/t1.jpg" }] }
];

export const ALL_CLIENTS = [
  { name: "Maria Rodriguez", email: "maria@beauty.com" },
  { name: "John Smith", email: "john@beauty.com" },
  { name: "Sarah Johnson", email: "sarah@beauty.com" },
  { name: "Emma Davis", email: "emma@beauty.com" },
  { name: "Olivia Taylor", email: "olivia@beauty.com" },
  { name: "Sophia Brown", email: "sophia@beauty.com" },
  { name: "Isabella Wilson", email: "isabella@beauty.com" },
  { name: "Mia Moore", email: "mia@beauty.com" },
  { name: "Charlotte Anderson", email: "charlotte@beauty.com" },
  { name: "Amelia Thomas", email: "amelia@beauty.com" },
  { name: "Harper Jackson", email: "harper@beauty.com" },
  { name: "Evelyn White", email: "evelyn@beauty.com" },
  { name: "Abigail Harris", email: "abigail@beauty.com" },
  { name: "Emily Martin", email: "emily@beauty.com" },
  { name: "Elizabeth Thompson", email: "elizabeth@beauty.com" },
  { name: "Sofia Garcia", email: "sofia@beauty.com" },
  { name: "Avery Martinez", email: "avery@beauty.com" },
  { name: "Ella Robinson", email: "ella@beauty.com" },
  { name: "Scarlett Clark", email: "scarlett@beauty.com" },
  { name: "Grace Rodriguez", email: "grace@beauty.com" },
  { name: "Chloe Lewis", email: "chloe@beauty.com" },
  { name: "Victoria Lee", email: "victoria@beauty.com" },
  { name: "Riley Walker", email: "riley@beauty.com" },
  { name: "Aria Hall", email: "aria@beauty.com" },
  { name: "Lily Allen", email: "lily@beauty.com" }
];

export const ALL_SERVICES = [
  "Hair Treatment",
  "Facial Care",
  "Massage Therapy",
  "Nail Art",
  "Eyebrow Shaping",
  "Waxing",
];

export const ALL_PROVIDERS = [
  { name: "Alice Wilson", image: "" },
  { name: "Bob Chen", image: "" },
  { name: "Carol Martinez", image: "" },
  { name: "David Kumar", image: "" },
];

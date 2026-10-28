export type SeatTier = 'Silver' | 'Gold' | 'Recliner';

export interface CastMember {
  name: string;
  role: string;
  photo: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number; // 1 to 5 or 1 to 10
  date: string;
  comment: string;
}

export interface Movie {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  synopsis: string;
  posterUrl: string;
  backdropUrl: string;
  trailerYoutubeUrl: string;
  durationMinutes: number;
  rating: number; // e.g. 8.7
  votesCount: number;
  ageRating: 'PG' | 'PG-13' | 'R' | 'U/A 13+' | 'U/A 16+';
  genres: string[];
  languages: string[];
  releaseDate: string;
  director: string;
  cast: CastMember[];
  formats: ('2D' | '3D' | 'IMAX 3D' | '4DX' | 'Dolby Atmos')[];
  isNowShowing: boolean;
  isUpcoming: boolean;
  reviews?: Review[];
}

export interface Screen {
  id: string;
  name: string;
  format: string;
  totalSeats: number;
  rows: number;
  cols: number;
}

export interface Theatre {
  id: string;
  name: string;
  city: string;
  address: string;
  distanceKm?: number;
  amenities: string[];
  screens: Screen[];
}

export interface Show {
  id: string;
  movieId: string;
  theatreId: string;
  screenId: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "10:15 AM", "01:45 PM", "06:30 PM", "09:45 PM"
  format: '2D' | '3D' | 'IMAX 3D' | '4DX' | 'Dolby Atmos';
  language: string;
  pricing: {
    Silver: number;
    Gold: number;
    Recliner: number;
  };
  bookedSeatIds: string[]; // e.g. ["C5", "C6", "A1"]
  lockedSeats?: {
    seatId: string;
    lockedUntil: number;
    userId?: string;
  }[];
}

export interface ConcessionItem {
  id: string;
  name: string;
  category: 'Popcorn' | 'Beverages' | 'Combos' | 'Snacks';
  price: number;
  imageUrl: string;
  description: string;
  isVeg: boolean;
  calories?: number;
}

export interface SelectedSeat {
  id: string; // e.g. "C7"
  row: string;
  number: number;
  tier: SeatTier;
  price: number;
}

export interface Booking {
  id: string;
  bookingCode: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  movieId: string;
  movieTitle: string;
  moviePoster: string;
  movieFormat: string;
  theatreId: string;
  theatreName: string;
  theatreCity: string;
  screenName: string;
  showId: string;
  showDate: string;
  showTime: string;
  seats: SelectedSeat[];
  concessions: {
    item: ConcessionItem;
    quantity: number;
  }[];
  pricingBreakdown: {
    ticketsSubtotal: number;
    concessionsSubtotal: number;
    convenienceFee: number;
    tax: number;
    discount: number;
    total: number;
  };
  promoApplied?: string;
  paymentId: string;
  paymentMethod: 'Credit / Debit Card' | 'Instant UPI' | 'Net Banking' | 'Apple Pay';
  paymentStatus: 'Success' | 'Refunded' | 'Failed';
  bookingStatus: 'Confirmed' | 'Cancelled';
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  phone?: string;
  avatar?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'booking' | 'cancellation' | 'reminder' | 'offer';
  read: boolean;
}

export type TaskStatus = 'todo' | 'in_progress' | 'completed';

export interface KanbanTask {
  id: string;
  epic: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export interface ProjectMeta {
  demoLink: string;
  githubLink: string;
  mentorName: string;
  mentorFeedback: string;
  lastUpdated: string;
}

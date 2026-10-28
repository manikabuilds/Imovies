import { Movie, Theatre, ConcessionItem, Show, Booking, KanbanTask, ProjectMeta } from '../types';

export const INITIAL_MOVIES: Movie[] = [
  {
    id: 'mov-1',
    title: 'Dune: Part Two',
    slug: 'dune-part-two',
    tagline: 'Long live the fighters.',
    synopsis: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he endeavors to prevent a terrible future only he can foresee.',
    posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80',
    trailerYoutubeUrl: 'https://www.youtube.com/watch?v=Way9Dexny3w',
    durationMinutes: 166,
    rating: 8.8,
    votesCount: 42100,
    ageRating: 'PG-13',
    genres: ['Sci-Fi', 'Adventure', 'Action'],
    languages: ['English', 'Spanish', 'French'],
    releaseDate: '2024-03-01',
    director: 'Denis Villeneuve',
    cast: [
      { name: 'Timothée Chalamet', role: 'Paul Atreides', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      { name: 'Zendaya', role: 'Chani', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
      { name: 'Rebecca Ferguson', role: 'Lady Jessica', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' },
      { name: 'Austin Butler', role: 'Feyd-Rautha', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' }
    ],
    formats: ['IMAX 3D', 'Dolby Atmos', '4DX', '2D'],
    isNowShowing: true,
    isUpcoming: false,
    reviews: [
      { id: 'rev-1', author: 'CinemaScope Elite', rating: 9.5, date: '2 days ago', comment: 'A towering visual and sonic masterpiece that demands to be seen on the largest screen imaginable.' },
      { id: 'rev-2', author: 'Elena Rostova', rating: 9.0, date: '1 week ago', comment: 'Hans Zimmer score paired with Denis Villeneuve cinematic vision is pure perfection.' }
    ]
  },
  {
    id: 'mov-2',
    title: 'Interstellar: 10th Anniversary IMAX',
    slug: 'interstellar-imax',
    tagline: 'Mankind was born on Earth. It was never meant to die here.',
    synopsis: 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.',
    posterUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=80',
    trailerYoutubeUrl: 'https://www.youtube.com/watch?v=zSWdZVtXT7E',
    durationMinutes: 169,
    rating: 8.9,
    votesCount: 98000,
    ageRating: 'PG-13',
    genres: ['Sci-Fi', 'Drama', 'Adventure'],
    languages: ['English'],
    releaseDate: '2024-09-27',
    director: 'Christopher Nolan',
    cast: [
      { name: 'Matthew McConaughey', role: 'Cooper', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80' },
      { name: 'Anne Hathaway', role: 'Brand', photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80' },
      { name: 'Jessica Chastain', role: 'Murph', photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80' }
    ],
    formats: ['IMAX 3D', 'Dolby Atmos', '2D'],
    isNowShowing: true,
    isUpcoming: false,
    reviews: [
      { id: 'rev-3', author: 'Marcus Vance', rating: 10, date: 'Yesterday', comment: 'The docking scene in 70mm IMAX with seat-rattling subwoofers gives goosebumps every single time.' }
    ]
  },
  {
    id: 'mov-3',
    title: 'Spider-Man: Beyond the Spider-Verse',
    slug: 'spider-man-beyond-the-spider-verse',
    tagline: 'Miles Morales returns for the next chapter.',
    synopsis: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat, Miles must redefine what it means to be a hero.',
    posterUrl: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1600&q=80',
    trailerYoutubeUrl: 'https://www.youtube.com/watch?v=cqGjhVJWtEg',
    durationMinutes: 140,
    rating: 8.7,
    votesCount: 38400,
    ageRating: 'PG',
    genres: ['Animation', 'Action', 'Adventure'],
    languages: ['English', 'Spanish'],
    releaseDate: '2025-05-10',
    director: 'Joaquim Dos Santos, Kemp Powers',
    cast: [
      { name: 'Shameik Moore', role: 'Miles Morales', photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80' },
      { name: 'Hailee Steinfeld', role: 'Gwen Stacy', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80' }
    ],
    formats: ['3D', '4DX', '2D'],
    isNowShowing: true,
    isUpcoming: false
  },
  {
    id: 'mov-4',
    title: 'Oppenheimer',
    slug: 'oppenheimer',
    tagline: 'The world forever changes.',
    synopsis: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II, examining the deep moral and geopolitical dilemmas of human creation.',
    posterUrl: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1447433589675-4aaa569f3e05?auto=format&fit=crop&w=1600&q=80',
    trailerYoutubeUrl: 'https://www.youtube.com/watch?v=uYPbbksJxIg',
    durationMinutes: 180,
    rating: 8.9,
    votesCount: 65000,
    ageRating: 'R',
    genres: ['Biography', 'Drama', 'History'],
    languages: ['English', 'German'],
    releaseDate: '2023-07-21',
    director: 'Christopher Nolan',
    cast: [
      { name: 'Cillian Murphy', role: 'J. Robert Oppenheimer', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      { name: 'Emily Blunt', role: 'Kitty Oppenheimer', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' }
    ],
    formats: ['IMAX 3D', 'Dolby Atmos', '2D'],
    isNowShowing: true,
    isUpcoming: false
  },
  {
    id: 'mov-5',
    title: 'Furiosa: A Mad Max Saga',
    slug: 'furiosa-mad-max-saga',
    tagline: 'Out of the fire, vengeance rises.',
    synopsis: 'As the world fell, young Furiosa is snatched from the Green Place of Many Mothers and falls into the hands of a great Biker Horde led by the Warlord Dementus. Sweeping through the Wasteland, they come across the Citadel presided over by The Immortan Joe.',
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1600&q=80',
    trailerYoutubeUrl: 'https://www.youtube.com/watch?v=XJMuhwVlca4',
    durationMinutes: 148,
    rating: 8.2,
    votesCount: 29000,
    ageRating: 'R',
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    languages: ['English'],
    releaseDate: '2024-05-24',
    director: 'George Miller',
    cast: [
      { name: 'Anya Taylor-Joy', role: 'Imperator Furiosa', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' },
      { name: 'Chris Hemsworth', role: 'Dementus', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' }
    ],
    formats: ['4DX', 'Dolby Atmos', '2D'],
    isNowShowing: true,
    isUpcoming: false
  },
  {
    id: 'mov-6',
    title: 'Cyberpunk: Neon Horizon',
    slug: 'cyberpunk-neon-horizon',
    tagline: 'When memory is currency, who can you trust?',
    synopsis: 'In Neo-Metropolis 2088, an underground neural-diver stumbles across an encrypted memory fragment containing proof that the city mega-corporation is harvesting synthetic consciousness.',
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80',
    trailerYoutubeUrl: 'https://www.youtube.com/watch?v=8X2kIfS6fb8',
    durationMinutes: 135,
    rating: 8.4,
    votesCount: 15400,
    ageRating: 'R',
    genres: ['Sci-Fi', 'Thriller', 'Cyberpunk'],
    languages: ['English', 'Japanese'],
    releaseDate: '2024-11-15',
    director: 'Kavita Sundaram',
    cast: [
      { name: 'Ken Watanabe', role: 'Detective Ren', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80' },
      { name: 'Devon Aoki', role: 'Kira V', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' }
    ],
    formats: ['IMAX 3D', 'Dolby Atmos', '2D'],
    isNowShowing: true,
    isUpcoming: false
  },
  {
    id: 'mov-7',
    title: 'Avatar: Fire and Ash',
    slug: 'avatar-fire-and-ash',
    tagline: 'A new fire awakens on Pandora.',
    synopsis: 'Jake Sully and Neytiri face an aggressive volcanic clan known as the Ash People on Pandora, testing the Na\'vi balance and threatening the fragile peace they fought so hard to defend.',
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
    trailerYoutubeUrl: 'https://www.youtube.com/watch?v=d9MyW72ELq0',
    durationMinutes: 192,
    rating: 9.1,
    votesCount: 52000,
    ageRating: 'PG-13',
    genres: ['Sci-Fi', 'Fantasy', 'Adventure'],
    languages: ['English', 'Spanish'],
    releaseDate: '2025-12-19',
    director: 'James Cameron',
    cast: [
      { name: 'Sam Worthington', role: 'Jake Sully', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      { name: 'Zoe Saldana', role: 'Neytiri', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' }
    ],
    formats: ['IMAX 3D', '4DX', '3D'],
    isNowShowing: false,
    isUpcoming: true
  },
  {
    id: 'mov-8',
    title: 'The Batman: Part II',
    slug: 'the-batman-part-two',
    tagline: 'Gotham never sleeps.',
    synopsis: 'Bruce Wayne delves deeper into the rotting political and underworld hierarchy of Gotham City following the catastrophic flood, confronting criminal syndicates and psychological terror.',
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1600&q=80',
    trailerYoutubeUrl: 'https://www.youtube.com/watch?v=mqqft2x_Aa4',
    durationMinutes: 175,
    rating: 8.6,
    votesCount: 31000,
    ageRating: 'PG-13',
    genres: ['Action', 'Crime', 'Drama'],
    languages: ['English'],
    releaseDate: '2026-10-02',
    director: 'Matt Reeves',
    cast: [
      { name: 'Robert Pattinson', role: 'Bruce Wayne / Batman', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' }
    ],
    formats: ['IMAX 3D', 'Dolby Atmos', '2D'],
    isNowShowing: false,
    isUpcoming: true
  }
];

export const INITIAL_THEATRES: Theatre[] = [
  {
    id: 'th-1',
    name: 'IMovies Grand IMAX & Luxe',
    city: 'New York',
    address: 'Times Square, 42nd St & Broadway, New York, NY 10036',
    distanceKm: 1.2,
    amenities: ['IMAX Dual Laser', 'Dolby Atmos Sound', 'Motorized VIP Recliners', 'Gourmet Kitchen', 'Bar & Lounge', 'Valet Parking'],
    screens: [
      { id: 'sc-1', name: 'IMAX Laser Hall 1', format: 'IMAX 3D', totalSeats: 96, rows: 8, cols: 12 },
      { id: 'sc-2', name: 'Dolby Atmos Screen 2', format: 'Dolby Atmos', totalSeats: 80, rows: 8, cols: 10 }
    ]
  },
  {
    id: 'th-2',
    name: 'IMovies StarDome Cinema',
    city: 'Los Angeles',
    address: 'Sunset Boulevard, Hollywood, Los Angeles, CA 90028',
    distanceKm: 2.8,
    amenities: ['4DX Motion Seats', 'Dolby Vision 4K', 'Heated Recliners', 'Cocktail Bar', 'EV Charging'],
    screens: [
      { id: 'sc-3', name: '4DX Motion Theater', format: '4DX', totalSeats: 72, rows: 6, cols: 12 },
      { id: 'sc-4', name: 'StarDome Premier', format: '2D', totalSeats: 96, rows: 8, cols: 12 }
    ]
  },
  {
    id: 'th-3',
    name: 'IMovies West End Royale',
    city: 'London',
    address: 'Leicester Square, London WC2H 7NA, United Kingdom',
    distanceKm: 3.5,
    amenities: ['IMAX 70mm', 'Dolby Atmos', 'In-seat Dining Service', 'Champagne Bar', 'Wheelchair Access'],
    screens: [
      { id: 'sc-5', name: 'Royal Auditorium A', format: 'IMAX 3D', totalSeats: 96, rows: 8, cols: 12 }
    ]
  },
  {
    id: 'th-4',
    name: 'IMovies Cineplex Metropolis',
    city: 'Mumbai',
    address: 'Bandra West, Linking Road, Mumbai 400050',
    distanceKm: 4.1,
    amenities: ['Dolby Atmos', 'RGB Laser 4K', 'Plush Recliners', 'Pure Veg Concessions', 'Reserved Parking'],
    screens: [
      { id: 'sc-6', name: 'Screen 1 Gold Class', format: 'Dolby Atmos', totalSeats: 80, rows: 8, cols: 10 }
    ]
  }
];

// Generate dynamic dates (Today, Tomorrow, Day+2, Day+3...)
const getFormattedDate = (offsetDays: number): string => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
};

export const INITIAL_SHOWS: Show[] = [
  // Dune 2 shows
  {
    id: 'sh-101',
    movieId: 'mov-1',
    theatreId: 'th-1',
    screenId: 'sc-1',
    date: getFormattedDate(0),
    time: '10:30 AM',
    format: 'IMAX 3D',
    language: 'English',
    pricing: { Silver: 14.5, Gold: 19.5, Recliner: 26.0 },
    bookedSeatIds: ['A4', 'A5', 'C6', 'C7', 'C8', 'D5', 'D6', 'E3', 'E4']
  },
  {
    id: 'sh-102',
    movieId: 'mov-1',
    theatreId: 'th-1',
    screenId: 'sc-1',
    date: getFormattedDate(0),
    time: '02:15 PM',
    format: 'IMAX 3D',
    language: 'English',
    pricing: { Silver: 15.5, Gold: 21.0, Recliner: 28.5 },
    bookedSeatIds: ['B3', 'B4', 'B5', 'B6', 'C7', 'C8', 'F4', 'F5', 'G6']
  },
  {
    id: 'sh-103',
    movieId: 'mov-1',
    theatreId: 'th-1',
    screenId: 'sc-1',
    date: getFormattedDate(0),
    time: '06:45 PM',
    format: 'IMAX 3D',
    language: 'English',
    pricing: { Silver: 17.0, Gold: 23.5, Recliner: 32.0 },
    bookedSeatIds: ['A1', 'A2', 'B3', 'B4', 'C4', 'C5', 'C6', 'C7', 'C8', 'D4', 'D5', 'D6', 'D7', 'E5', 'E6', 'G4', 'G5']
  },
  {
    id: 'sh-104',
    movieId: 'mov-1',
    theatreId: 'th-1',
    screenId: 'sc-1',
    date: getFormattedDate(0),
    time: '10:15 PM',
    format: 'IMAX 3D',
    language: 'English',
    pricing: { Silver: 15.0, Gold: 20.0, Recliner: 27.0 },
    bookedSeatIds: ['C4', 'C5', 'D7', 'D8']
  },
  {
    id: 'sh-105',
    movieId: 'mov-1',
    theatreId: 'th-1',
    screenId: 'sc-1',
    date: getFormattedDate(1),
    time: '01:30 PM',
    format: 'IMAX 3D',
    language: 'English',
    pricing: { Silver: 15.5, Gold: 21.0, Recliner: 28.5 },
    bookedSeatIds: ['C6', 'C7']
  },
  {
    id: 'sh-106',
    movieId: 'mov-1',
    theatreId: 'th-1',
    screenId: 'sc-1',
    date: getFormattedDate(1),
    time: '07:00 PM',
    format: 'IMAX 3D',
    language: 'English',
    pricing: { Silver: 17.0, Gold: 23.5, Recliner: 32.0 },
    bookedSeatIds: ['B4', 'B5', 'B6', 'C5', 'C6', 'D5']
  },

  // Interstellar shows
  {
    id: 'sh-201',
    movieId: 'mov-2',
    theatreId: 'th-1',
    screenId: 'sc-1',
    date: getFormattedDate(0),
    time: '03:45 PM',
    format: 'IMAX 3D',
    language: 'English',
    pricing: { Silver: 16.0, Gold: 22.0, Recliner: 30.0 },
    bookedSeatIds: ['B5', 'B6', 'C5', 'C6', 'C7', 'D5', 'D6']
  },
  {
    id: 'sh-202',
    movieId: 'mov-2',
    theatreId: 'th-2',
    screenId: 'sc-4',
    date: getFormattedDate(0),
    time: '07:30 PM',
    format: '2D',
    language: 'English',
    pricing: { Silver: 13.0, Gold: 17.5, Recliner: 24.0 },
    bookedSeatIds: ['C4', 'C5', 'C6', 'D4', 'D5']
  },

  // Spider-Man shows
  {
    id: 'sh-301',
    movieId: 'mov-3',
    theatreId: 'th-2',
    screenId: 'sc-3',
    date: getFormattedDate(0),
    time: '11:00 AM',
    format: '4DX',
    language: 'English',
    pricing: { Silver: 16.0, Gold: 21.0, Recliner: 28.0 },
    bookedSeatIds: ['B2', 'B3', 'C3', 'C4']
  },
  {
    id: 'sh-302',
    movieId: 'mov-3',
    theatreId: 'th-2',
    screenId: 'sc-3',
    date: getFormattedDate(0),
    time: '05:30 PM',
    format: '4DX',
    language: 'English',
    pricing: { Silver: 18.0, Gold: 24.0, Recliner: 32.0 },
    bookedSeatIds: ['C5', 'C6', 'D5', 'D6', 'E5']
  },

  // Oppenheimer shows
  {
    id: 'sh-401',
    movieId: 'mov-4',
    theatreId: 'th-1',
    screenId: 'sc-2',
    date: getFormattedDate(0),
    time: '08:00 PM',
    format: 'Dolby Atmos',
    language: 'English',
    pricing: { Silver: 15.0, Gold: 20.0, Recliner: 27.0 },
    bookedSeatIds: ['C4', 'C5', 'D6', 'D7']
  },

  // Cyberpunk & Furiosa shows
  {
    id: 'sh-501',
    movieId: 'mov-5',
    theatreId: 'th-2',
    screenId: 'sc-3',
    date: getFormattedDate(0),
    time: '09:00 PM',
    format: '4DX',
    language: 'English',
    pricing: { Silver: 17.5, Gold: 23.0, Recliner: 31.0 },
    bookedSeatIds: ['A3', 'A4', 'B5', 'B6']
  },
  {
    id: 'sh-601',
    movieId: 'mov-6',
    theatreId: 'th-1',
    screenId: 'sc-2',
    date: getFormattedDate(0),
    time: '04:30 PM',
    format: 'Dolby Atmos',
    language: 'English',
    pricing: { Silver: 14.0, Gold: 19.0, Recliner: 25.0 },
    bookedSeatIds: ['C5', 'C6']
  }
];

export const INITIAL_CONCESSIONS: ConcessionItem[] = [
  {
    id: 'fnb-1',
    name: 'Jumbo Golden Butter Popcorn',
    category: 'Popcorn',
    price: 8.50,
    imageUrl: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=400&q=80',
    description: 'Freshly popped warm gourmet corn bathed in rich clarified butter and fine sea salt.',
    isVeg: true,
    calories: 640
  },
  {
    id: 'fnb-2',
    name: 'Artisan Salted Caramel Crunch',
    category: 'Popcorn',
    price: 9.25,
    imageUrl: 'https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&w=400&q=80',
    description: 'Kettle-cooked crunchy popcorn glazed with small-batch brown sugar caramel.',
    isVeg: true,
    calories: 720
  },
  {
    id: 'fnb-3',
    name: 'Loaded Cheddar & Jalapeño Nachos',
    category: 'Snacks',
    price: 10.50,
    imageUrl: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=400&q=80',
    description: 'Crisp stone-ground tortilla chips topped with molten aged cheddar and pickled jalapeño peppers.',
    isVeg: true,
    calories: 810
  },
  {
    id: 'fnb-4',
    name: 'Fountain Soda (Large Refillable)',
    category: 'Beverages',
    price: 5.75,
    imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80',
    description: 'Choice of Coca-Cola Classic, Zero Sugar, Sprite, or Wild Berry Sparkler on draft with crushed ice.',
    isVeg: true,
    calories: 220
  },
  {
    id: 'fnb-5',
    name: 'Blockbuster Couple Combo',
    category: 'Combos',
    price: 21.00,
    imageUrl: 'https://images.unsplash.com/photo-1585647347384-2593bc35786b?auto=format&fit=crop&w=400&q=80',
    description: '1 Jumbo Tub Butter Popcorn + 2 Large Fountain Sodas + 1 Choice of Nachos or Red Vines candy.',
    isVeg: true,
    calories: 1450
  },
  {
    id: 'fnb-6',
    name: 'Cold-Pressed Iced Matcha Latte',
    category: 'Beverages',
    price: 6.50,
    imageUrl: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=400&q=80',
    description: 'Ceremonial grade Uji green tea whisked fresh over creamy oat milk with subtle Madagascar vanilla.',
    isVeg: true,
    calories: 180
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-901',
    bookingCode: 'IM-8274-NYX',
    userId: 'usr-1',
    userName: 'Alex Mercer',
    userEmail: 'alex.mercer@gmail.com',
    userPhone: '+1 (555) 234-8901',
    movieId: 'mov-1',
    movieTitle: 'Dune: Part Two',
    moviePoster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    movieFormat: 'IMAX 3D',
    theatreId: 'th-1',
    theatreName: 'IMovies Grand IMAX & Luxe',
    theatreCity: 'New York',
    screenName: 'IMAX Laser Hall 1',
    showId: 'sh-103',
    showDate: getFormattedDate(0),
    showTime: '06:45 PM',
    seats: [
      { id: 'C7', row: 'C', number: 7, tier: 'Gold', price: 23.5 },
      { id: 'C8', row: 'C', number: 8, tier: 'Gold', price: 23.5 }
    ],
    concessions: [
      { item: INITIAL_CONCESSIONS[0], quantity: 1 },
      { item: INITIAL_CONCESSIONS[3], quantity: 2 }
    ],
    pricingBreakdown: {
      ticketsSubtotal: 47.0,
      concessionsSubtotal: 20.0,
      convenienceFee: 3.5,
      tax: 8.46,
      discount: 5.0,
      total: 73.96
    },
    promoApplied: 'FIRST50',
    paymentId: 'PAY-TXN-982143',
    paymentMethod: 'Credit / Debit Card',
    paymentStatus: 'Success',
    bookingStatus: 'Confirmed',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  }
];

export const INITIAL_KANBAN_TASKS: KanbanTask[] = [
  // Epic 1: Environment Setup
  { id: 't-1', epic: '1. Environment Setup', title: 'Node.js & Vite MERN Architecture', description: 'Configure high performance client-server architecture with Express and React.', status: 'completed' },
  { id: 't-2', epic: '1. Environment Setup', title: 'Dependency Manifest & Packages', description: 'Configure packages: Express, Lucide, Tailwind, Motion, and state modules.', status: 'completed' },
  { id: 't-3', epic: '1. Environment Setup', title: 'Environment & Port Configuration', description: 'Configure port 3000, environment variables, and proxy routing.', status: 'completed' },
  { id: 't-4', epic: '1. Environment Setup', title: 'Demo & GitHub Links Setup', description: 'Enable interactive link submission and repository tracker for mentor review.', status: 'completed' },

  // Epic 2: Database Design
  { id: 't-5', epic: '2. Database Design', title: 'Users & Roles Schema', description: 'Define user profiles, credentials, admin access roles, and preferences.', status: 'completed' },
  { id: 't-6', epic: '2. Database Design', title: 'Movies & Theatres Collections', description: 'Model movie synopses, trailers, cast, age ratings, formats, and theatre screens.', status: 'completed' },
  { id: 't-7', epic: '2. Database Design', title: 'Shows, Seats & Bookings Model', description: 'Multi-tier seat matrix (Silver, Gold, Recliner), live locks, and transactions.', status: 'completed' },

  // Epic 3: Application Development
  { id: 't-8', epic: '3. Application Development', title: 'Authentication & Session Handling', description: 'JWT authentication simulation, password hashing, and user profile switching.', status: 'completed' },
  { id: 't-9', epic: '3. Application Development', title: 'Search & Multi-Filter Engine', description: 'Instant search by genre, language, theatre location, format, and dates.', status: 'completed' },
  { id: 't-10', epic: '3. Application Development', title: 'Real-Time Seat Booking Engine', description: 'Interactive curved hall layout, live seat status, price computation & lock.', status: 'completed' },
  { id: 't-11', epic: '3. Application Development', title: 'Concessions & F&B Ordering', description: 'Cinema food cart with gourmet popcorn, loaded nachos, and beverage combos.', status: 'completed' },

  // Epic 4: Role-Based Security
  { id: 't-12', epic: '4. Role-Based Security', title: 'Role Access Control (User vs Admin)', description: 'Protected routes and admin management portal for movies, shows, and revenue.', status: 'completed' },
  { id: 't-13', epic: '4. Role-Based Security', title: 'Booking Validation & Integrity', description: 'Prevent double bookings, enforce seat reservation limits, and calculate taxes.', status: 'completed' },
  { id: 't-14', epic: '4. Role-Based Security', title: 'Payment Gateway Simulation', description: 'Card validation, UPI QR code, NetBanking, promo codes, and transaction receipts.', status: 'completed' },

  // Epic 5: Frontend Integration
  { id: 't-15', epic: '5. Frontend Integration', title: 'Cinematic Dark UI & Hero Showcase', description: 'Responsive high-contrast cinematic interface with movie spotlights and trailers.', status: 'completed' },
  { id: 't-16', epic: '5. Frontend Integration', title: 'Digital Boarding Pass & QR Generator', description: 'Generate printable ticket pass with scannable QR code and barcode.', status: 'completed' },
  { id: 't-17', epic: '5. Frontend Integration', title: 'Booking History & Instant Refund', description: 'View active/past reservations with 1-click cancellation and refund calculation.', status: 'completed' },

  // Epic 6: Testing & Optimization
  { id: 't-18', epic: '6. Testing & Optimization', title: 'Admin Cinema Manager Panel', description: 'Live revenue metrics, movie catalog editor, and show scheduler.', status: 'completed' },
  { id: 't-19', epic: '6. Testing & Optimization', title: 'REST API & Postman Suite Preview', description: 'Interactive API collection inspector for testing CRUD endpoints and auth.', status: 'completed' }
];

export const INITIAL_PROJECT_META: ProjectMeta = {
  demoLink: typeof window !== 'undefined' ? window.location.origin : 'https://imovies-booking.run.app',
  githubLink: 'https://github.com/developer/imovies-mern-cinema',
  mentorName: 'Unassigned (Awaiting Review)',
  mentorFeedback: 'Ready for evaluation! All 6 Epics and 19 subtasks implemented with full booking workflows, admin panel, and live ticket generator.',
  lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
};

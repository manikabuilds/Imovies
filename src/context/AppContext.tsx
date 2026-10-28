import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Movie, Theatre, Show, Booking, ConcessionItem, User, 
  Notification, SelectedSeat 
} from '../types';
import { 
  INITIAL_MOVIES, INITIAL_THEATRES, INITIAL_SHOWS, 
  INITIAL_CONCESSIONS, INITIAL_BOOKINGS 
} from '../data/mockData';
import confetti from 'canvas-confetti';

export type NavTab = 'movies' | 'theatres' | 'concessions' | 'offers';
export type AuthMode = 'signin' | 'register';

export interface RegisteredAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  phone?: string;
  registeredAt: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface ConfirmDialog {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
}

interface AppContextType {
  // Domain data
  movies: Movie[];
  theatres: Theatre[];
  shows: Show[];
  concessions: ConcessionItem[];
  bookings: Booking[];
  notifications: Notification[];

  // Active view tab in main page
  activeNavTab: NavTab;
  setActiveNavTab: (tab: NavTab) => void;

  // Filtering & Selection
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedGenre: string;
  setSelectedGenre: (g: string) => void;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  selectedFormat: string;
  setSelectedFormat: (format: string) => void;

  // User Auth & Roles (Customer vs Movie Theatre Admin)
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  authMode: AuthMode;
  setAuthMode: (mode: AuthMode) => void;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  openAuthModal: (mode?: AuthMode) => void;
  toggleRole: () => void;
  registerUser: (name: string, email: string, password: string, role: 'user' | 'admin', phone?: string) => boolean;
  loginWithCredentials: (email: string, password?: string) => boolean;
  loginUser: (email: string, name?: string, role?: 'user' | 'admin') => void;
  logoutUser: () => void;

  // In-app Toasts & Confirmations
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  confirmDialog: ConfirmDialog | null;
  askConfirm: (dialog: ConfirmDialog) => void;
  closeConfirm: () => void;

  // Actions
  createBooking: (
    movie: Movie,
    theatre: Theatre,
    show: Show,
    seats: SelectedSeat[],
    concessions: { item: ConcessionItem; quantity: number }[],
    promoCode: string,
    paymentMethod: Booking['paymentMethod']
  ) => Promise<Booking>;
  cancelBooking: (bookingId: string) => void;
  addMovie: (movie: Omit<Movie, 'id'>) => void;
  updateMovie: (movie: Movie) => void;
  deleteMovie: (movieId: string) => void;
  addShow: (show: Omit<Show, 'id'>) => void;
  deleteShow: (showId: string) => void;
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;

  // Modals & Navigation
  activeMovieModal: Movie | null;
  setActiveMovieModal: (movie: Movie | null) => void;
  activeBookingShow: { movie: Movie; show: Show; theatre: Theatre } | null;
  setActiveBookingShow: (data: { movie: Movie; show: Show; theatre: Theatre } | null) => void;
  activeTicketPass: Booking | null;
  setActiveTicketPass: (booking: Booking | null) => void;
  showBookingHistory: boolean;
  setShowBookingHistory: (show: boolean) => void;
  showAdminPanel: boolean;
  setShowAdminPanel: (show: boolean) => void;
  activeTrailerMovie: Movie | null;
  setActiveTrailerMovie: (movie: Movie | null) => void;
}

const INITIAL_REGISTERED_USERS: RegisteredAccount[] = [
  {
    id: 'usr-1',
    name: 'Alex Mercer',
    email: 'alex.mercer@gmail.com',
    password: 'password123',
    role: 'user',
    phone: '+1 (555) 234-8901',
    registeredAt: '2024-01-15'
  },
  {
    id: 'usr-admin-1',
    name: 'Cinema Administrator',
    email: 'admin@imovies.com',
    password: 'adminpassword',
    role: 'admin',
    phone: '+1 (555) 999-0000',
    registeredAt: '2023-11-01'
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const loadStorage = <T,>(key: string, fallback: T): T => {
    try {
      const item = typeof window !== 'undefined' ? localStorage.getItem(`imovies_${key}`) : null;
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  };

  const saveStorage = <T,>(key: string, data: T) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(`imovies_${key}`, JSON.stringify(data));
      }
    } catch (e) {
      console.error('Storage save error', e);
    }
  };

  // State
  const [activeNavTab, setActiveNavTab] = useState<NavTab>('movies');
  const [movies, setMovies] = useState<Movie[]>(() => loadStorage('movies', INITIAL_MOVIES));
  const [theatres] = useState<Theatre[]>(() => loadStorage('theatres', INITIAL_THEATRES));
  const [shows, setShows] = useState<Show[]>(() => loadStorage('shows', INITIAL_SHOWS));
  const [concessions] = useState<ConcessionItem[]>(() => loadStorage('concessions', INITIAL_CONCESSIONS));
  const [bookings, setBookings] = useState<Booking[]>(() => loadStorage('bookings', INITIAL_BOOKINGS));
  
  // Registered user accounts database
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredAccount[]>(() => 
    loadStorage('registered_users', INITIAL_REGISTERED_USERS)
  );

  const [currentUser, setCurrentUser] = useState<User | null>(() => loadStorage('user', {
    id: 'usr-1',
    name: 'Alex Mercer',
    email: 'alex.mercer@gmail.com',
    role: 'user',
    phone: '+1 (555) 234-8901'
  }));

  const [notifications, setNotifications] = useState<Notification[]>(() => loadStorage('notifications', [
    {
      id: 'notif-1',
      title: 'Welcome to IMovies Cinema!',
      message: 'Explore IMAX 3D, Dolby Atmos showtimes and reserve your seats in real-time.',
      timestamp: 'Just now',
      type: 'offer',
      read: false
    },
    {
      id: 'notif-2',
      title: 'Tickets Confirmed',
      message: 'Your tickets for Dune: Part Two at IMovies Grand IMAX are confirmed. Have a great show!',
      timestamp: '4 hours ago',
      type: 'booking',
      read: false
    }
  ]));

  // In-app Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialog | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const askConfirm = (dialog: ConfirmDialog) => {
    setConfirmDialog(dialog);
  };

  const closeConfirm = () => {
    setConfirmDialog(null);
  };

  // Filters
  const [selectedCity, setSelectedCity] = useState<string>('New York');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [selectedFormat, setSelectedFormat] = useState<string>('All');

  // Modals
  const [activeMovieModal, setActiveMovieModal] = useState<Movie | null>(null);
  const [activeBookingShow, setActiveBookingShow] = useState<{ movie: Movie; show: Show; theatre: Theatre } | null>(null);
  const [activeTicketPass, setActiveTicketPass] = useState<Booking | null>(null);
  const [showBookingHistory, setShowBookingHistory] = useState<boolean>(false);
  const [showAdminPanel, setShowAdminPanel] = useState<boolean>(false);
  const [activeTrailerMovie, setActiveTrailerMovie] = useState<Movie | null>(null);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<AuthMode>('signin');

  // Open auth modal with specific mode (signin vs register)
  const openAuthModal = (mode: AuthMode = 'signin') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  // Sync to localStorage
  useEffect(() => { saveStorage('movies', movies); }, [movies]);
  useEffect(() => { saveStorage('shows', shows); }, [shows]);
  useEffect(() => { saveStorage('bookings', bookings); }, [bookings]);
  useEffect(() => { saveStorage('user', currentUser); }, [currentUser]);
  useEffect(() => { saveStorage('registered_users', registeredUsers); }, [registeredUsers]);
  useEffect(() => { saveStorage('notifications', notifications); }, [notifications]);

  // Role toggle
  const toggleRole = () => {
    setCurrentUser(prev => {
      if (!prev) return null;
      const nextRole = prev.role === 'admin' ? 'user' : 'admin';
      const nextUser: User = {
        ...prev,
        role: nextRole,
        name: nextRole === 'admin' ? 'Cinema Administrator' : 'Alex Mercer',
        email: nextRole === 'admin' ? 'admin@imovies.com' : 'alex.mercer@gmail.com'
      };
      showToast(`Switched profile to ${nextRole === 'admin' ? 'Theatre Admin' : 'Customer'}`, 'info');
      return nextUser;
    });
  };

  // Register a new user
  const registerUser = (
    name: string,
    email: string,
    password: string,
    role: 'user' | 'admin',
    phone?: string
  ): boolean => {
    const normalizedEmail = email.toLowerCase().trim();
    const existing = registeredUsers.find(u => u.email.toLowerCase() === normalizedEmail);
    if (existing) {
      showToast(`An account with email "${email}" already exists. Please Sign In.`, 'error');
      return false;
    }

    const newAccount: RegisteredAccount = {
      id: `usr-${Date.now()}`,
      name: name.trim() || normalizedEmail.split('@')[0],
      email: normalizedEmail,
      password,
      role,
      phone: phone?.trim(),
      registeredAt: new Date().toISOString()
    };

    setRegisteredUsers(prev => [newAccount, ...prev]);

    const userObj: User = {
      id: newAccount.id,
      name: newAccount.name,
      email: newAccount.email,
      role: newAccount.role,
      phone: newAccount.phone
    };

    setCurrentUser(userObj);
    setShowAuthModal(false);
    showToast(`Account created! Welcome, ${userObj.name} (${role === 'admin' ? 'Theatre Admin' : 'Customer'})`, 'success');
    
    // Add welcome notification
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'Account Registered Successfully!',
        message: `Welcome to IMovies. Your ${role === 'admin' ? 'Theatre Admin' : 'Customer'} privileges are active.`,
        timestamp: 'Just now',
        type: 'offer',
        read: false
      },
      ...prev
    ]);

    return true;
  };

  // Login with credentials
  const loginWithCredentials = (email: string, password?: string): boolean => {
    const normalizedEmail = email.toLowerCase().trim();
    const account = registeredUsers.find(u => u.email.toLowerCase() === normalizedEmail);

    if (account) {
      if (password && account.password && password !== account.password) {
        showToast('Incorrect password. Please try again.', 'error');
        return false;
      }
      const userObj: User = {
        id: account.id,
        name: account.name,
        email: account.email,
        role: account.role,
        phone: account.phone
      };
      setCurrentUser(userObj);
      setShowAuthModal(false);
      showToast(`Welcome back, ${userObj.name}! Signed in as ${userObj.role === 'admin' ? 'Theatre Admin' : 'Customer'}.`, 'success');
      return true;
    }

    // Auto-create/demo login fallback if not in registry
    const role: 'user' | 'admin' = normalizedEmail.includes('admin') ? 'admin' : 'user';
    const userObj: User = {
      id: `usr-${Date.now()}`,
      name: role === 'admin' ? 'Cinema Administrator' : normalizedEmail.split('@')[0],
      email: normalizedEmail,
      role,
      phone: '+1 (555) 789-0123'
    };
    setCurrentUser(userObj);
    setShowAuthModal(false);
    showToast(`Signed in as ${userObj.name} (${role === 'admin' ? 'Theatre Admin' : 'Customer'})`, 'success');
    return true;
  };

  const loginUser = (email: string, name?: string, role?: 'user' | 'admin') => {
    const determinedRole = role || (email.toLowerCase().includes('admin') ? 'admin' : 'user');
    const userObj: User = {
      id: `usr-${Date.now()}`,
      name: name || (determinedRole === 'admin' ? 'Cinema Administrator' : email.split('@')[0]),
      email,
      role: determinedRole,
      phone: '+1 (555) 789-0123'
    };
    setCurrentUser(userObj);
    setShowAuthModal(false);
    showToast(`Signed in as ${userObj.name} (${determinedRole === 'admin' ? 'Theatre Admin' : 'Customer'})`, 'success');
  };

  const logoutUser = () => {
    setCurrentUser(null);
    showToast('You have been signed out successfully.', 'info');
  };

  // Create Booking
  const createBooking = async (
    movie: Movie,
    theatre: Theatre,
    show: Show,
    seats: SelectedSeat[],
    concessionsList: { item: ConcessionItem; quantity: number }[],
    promoCode: string,
    paymentMethod: Booking['paymentMethod']
  ): Promise<Booking> => {
    const ticketsSubtotal = seats.reduce((acc, s) => acc + s.price, 0);
    const concessionsSubtotal = concessionsList.reduce((acc, c) => acc + (c.item.price * c.quantity), 0);
    const convenienceFee = seats.length * 1.75;
    
    let discount = 0;
    if (promoCode.toUpperCase() === 'FIRST50') {
      discount = 5.0;
    } else if (promoCode.toUpperCase() === 'IMOVIESVIP') {
      discount = (ticketsSubtotal + concessionsSubtotal) * 0.20;
    } else if (promoCode.toUpperCase() === 'POPCORNFREE') {
      discount = 8.5;
    }
    
    discount = Math.min(discount, ticketsSubtotal + concessionsSubtotal);
    const taxableAmount = Math.max(0, ticketsSubtotal + concessionsSubtotal - discount);
    const tax = +(taxableAmount * 0.12).toFixed(2);
    const total = +(taxableAmount + convenienceFee + tax).toFixed(2);

    const bookingCode = `IM-${Math.floor(1000 + Math.random() * 9000)}-${theatre.city.substring(0, 3).toUpperCase()}`;
    const paymentId = `PAY-TXN-${Date.now().toString().slice(-6)}`;

    const newBooking: Booking = {
      id: `bk-${Date.now()}`,
      bookingCode,
      userId: currentUser?.id || 'usr-guest',
      userName: currentUser?.name || 'Guest Moviegoer',
      userEmail: currentUser?.email || 'guest@imovies.com',
      userPhone: currentUser?.phone || '+1 (555) 234-8901',
      movieId: movie.id,
      movieTitle: movie.title,
      moviePoster: movie.posterUrl,
      movieFormat: show.format,
      theatreId: theatre.id,
      theatreName: theatre.name,
      theatreCity: theatre.city,
      screenName: theatre.screens.find(s => s.id === show.screenId)?.name || 'Screen 1',
      showId: show.id,
      showDate: show.date,
      showTime: show.time,
      seats,
      concessions: concessionsList,
      pricingBreakdown: {
        ticketsSubtotal,
        concessionsSubtotal,
        convenienceFee,
        tax,
        discount,
        total
      },
      promoApplied: promoCode || undefined,
      paymentId,
      paymentMethod,
      paymentStatus: 'Success',
      bookingStatus: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    const seatIds = seats.map(s => s.id);
    setShows(prev => prev.map(s => {
      if (s.id === show.id) {
        return {
          ...s,
          bookedSeatIds: [...s.bookedSeatIds, ...seatIds]
        };
      }
      return s;
    }));

    setBookings(prev => [newBooking, ...prev]);

    const newNotif: Notification = {
      id: `notif-${Date.now()}`,
      title: 'Booking Confirmed!',
      message: `Your reservation for ${movie.title} (${seats.map(s => s.id).join(', ')}) at ${theatre.name} is confirmed. Booking Code: ${bookingCode}`,
      timestamp: 'Just now',
      type: 'booking',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
    showToast(`Tickets Confirmed for ${movie.title}! Code: ${bookingCode}`, 'success');

    try {
      if (typeof window !== 'undefined') {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch {
      // Safe fallback
    }

    return newBooking;
  };

  // Cancel Booking
  const cancelBooking = (bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking || booking.bookingStatus === 'Cancelled') return;

    const seatIdsToFree = booking.seats.map(s => s.id);
    setShows(prev => prev.map(s => {
      if (s.id === booking.showId) {
        return {
          ...s,
          bookedSeatIds: s.bookedSeatIds.filter(id => !seatIdsToFree.includes(id))
        };
      }
      return s;
    }));

    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          bookingStatus: 'Cancelled',
          paymentStatus: 'Refunded'
        };
      }
      return b;
    }));

    const newNotif: Notification = {
      id: `notif-${Date.now()}`,
      title: 'Booking Cancelled & Refunded',
      message: `Booking ${booking.bookingCode} for ${booking.movieTitle} has been cancelled. Full refund of $${booking.pricingBreakdown.total.toFixed(2)} has been credited.`,
      timestamp: 'Just now',
      type: 'cancellation',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
    showToast(`Booking ${booking.bookingCode} cancelled. Refund of $${booking.pricingBreakdown.total.toFixed(2)} credited!`, 'info');
  };

  const addMovie = (movieData: Omit<Movie, 'id'>) => {
    const newMovie: Movie = {
      ...movieData,
      id: `mov-${Date.now()}`
    };
    setMovies(prev => [newMovie, ...prev]);
    showToast(`Added "${newMovie.title}" to catalog`, 'success');
  };

  const updateMovie = (updatedMovie: Movie) => {
    setMovies(prev => prev.map(m => m.id === updatedMovie.id ? updatedMovie : m));
    showToast(`Updated "${updatedMovie.title}"`, 'info');
  };

  const deleteMovie = (movieId: string) => {
    const target = movies.find(m => m.id === movieId);
    setMovies(prev => prev.filter(m => m.id !== movieId));
    setShows(prev => prev.filter(s => s.movieId !== movieId));
    showToast(`Deleted "${target?.title || 'movie'}" from catalog`, 'info');
  };

  const addShow = (showData: Omit<Show, 'id'>) => {
    const newShow: Show = {
      ...showData,
      id: `sh-${Date.now()}`,
      bookedSeatIds: []
    };
    setShows(prev => [...prev, newShow]);
    showToast(`Published new show for ${newShow.time}`, 'success');
  };

  const deleteShow = (showId: string) => {
    setShows(prev => prev.filter(s => s.id !== showId));
    showToast('Show deleted from schedule', 'info');
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    showToast('Notifications cleared', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        movies,
        theatres,
        shows,
        concessions,
        bookings,
        notifications,
        activeNavTab,
        setActiveNavTab,
        selectedCity,
        setSelectedCity,
        searchQuery,
        setSearchQuery,
        selectedGenre,
        setSelectedGenre,
        selectedLanguage,
        setSelectedLanguage,
        selectedFormat,
        setSelectedFormat,
        currentUser,
        setCurrentUser,
        authMode,
        setAuthMode,
        showAuthModal,
        setShowAuthModal,
        openAuthModal,
        toggleRole,
        registerUser,
        loginWithCredentials,
        loginUser,
        logoutUser,
        toasts,
        showToast,
        removeToast,
        confirmDialog,
        askConfirm,
        closeConfirm,
        createBooking,
        cancelBooking,
        addMovie,
        updateMovie,
        deleteMovie,
        addShow,
        deleteShow,
        markNotificationRead,
        clearAllNotifications,
        activeMovieModal,
        setActiveMovieModal,
        activeBookingShow,
        setActiveBookingShow,
        activeTicketPass,
        setActiveTicketPass,
        showBookingHistory,
        setShowBookingHistory,
        showAdminPanel,
        setShowAdminPanel,
        activeTrailerMovie,
        setActiveTrailerMovie
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

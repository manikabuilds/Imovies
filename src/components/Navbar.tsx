import React, { useState } from 'react';
import { 
  Film, Search, MapPin, Ticket, ShieldCheck, 
  UserCheck, Bell, ChevronDown, CheckCircle2,
  Popcorn, Tag, LogIn, UserPlus, LogOut, User as UserIcon
} from 'lucide-react';
import { useApp, NavTab } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const { 
    selectedCity, setSelectedCity, 
    searchQuery, setSearchQuery, 
    currentUser, toggleRole, logoutUser,
    bookings, notifications, markNotificationRead, clearAllNotifications,
    setShowBookingHistory, setShowAdminPanel,
    openAuthModal,
    activeNavTab, setActiveNavTab
  } = useApp();

  const [showCityMenu, setShowCityMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const cities = ['New York', 'Los Angeles', 'London', 'Mumbai', 'Chicago', 'Toronto'];
  const activeBookingsCount = bookings.filter(b => b.bookingStatus === 'Confirmed').length;
  const unreadNotifs = notifications.filter(n => !n.read).length;

  const navItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'movies', label: 'Movies', icon: <Film className="w-3.5 h-3.5" /> },
    { id: 'theatres', label: 'Theatres', icon: <MapPin className="w-3.5 h-3.5" /> },
    { id: 'concessions', label: 'Cinema Cafe', icon: <Popcorn className="w-3.5 h-3.5" /> },
    { id: 'offers', label: 'Offers', icon: <Tag className="w-3.5 h-3.5" /> }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0b0f17]/95 backdrop-blur-md border-b border-slate-800">
      {/* Main Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-4">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div 
            onClick={() => {
              setActiveNavTab('movies');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-rose-600/30 group-hover:scale-105 transition-transform">
              <Film className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-white font-['Space_Grotesk']">
                  I<span className="text-rose-500">MOVIES</span>
                </span>
                <span className="text-[10px] font-semibold text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20">
                  CINEMA
                </span>
              </div>
              <p className="text-[10px] text-slate-400 leading-none hidden sm:block">Movie ticket booking made simple</p>
            </div>
          </div>

          {/* City Selector */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setShowCityMenu(!showCityMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>{selectedCity}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showCityMenu && (
              <div className="absolute left-0 mt-2 w-44 bg-slate-900 border border-slate-800 rounded-xl shadow-xl shadow-black/60 py-1.5 z-50">
                <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Select Location
                </div>
                {cities.map(city => (
                  <button
                    key={city}
                    onClick={() => {
                      setSelectedCity(city);
                      setShowCityMenu(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-800 transition-colors cursor-pointer ${
                      selectedCity === city ? 'text-rose-400 font-medium' : 'text-slate-300'
                    }`}
                  >
                    <span>{city}</span>
                    {selectedCity === city && <CheckCircle2 className="w-3.5 h-3.5 text-rose-500" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop Primary Nav Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800/80">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveNavTab(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeNavTab === item.id
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Search Bar */}
        <div className="flex-1 max-w-xs relative hidden sm:block">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search movies, genres, actors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 text-xs text-slate-200 pl-9 pr-8 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 placeholder:text-slate-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* My Tickets (Visible for Customers & Guests) */}
          <button
            onClick={() => setShowBookingHistory(true)}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors relative cursor-pointer"
          >
            <Ticket className="w-4 h-4 text-rose-500" />
            <span className="hidden sm:inline">My Tickets</span>
            {activeBookingsCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] flex items-center justify-center font-bold">
                {activeBookingsCount}
              </span>
            )}
          </button>

          {/* Admin Management Button (Prominently displayed if role === 'admin') */}
          {currentUser && currentUser.role === 'admin' && (
            <button
              onClick={() => setShowAdminPanel(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-300 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 transition-colors cursor-pointer shadow-sm"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Cinema Admin Panel</span>
            </button>
          )}

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifMenu(!showNotifMenu);
                setShowUserMenu(false);
              }}
              className="p-2 rounded-lg text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 relative transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifs > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] flex items-center justify-center font-bold animate-pulse">
                  {unreadNotifs}
                </span>
              )}
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl shadow-black/80 p-3 z-50">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Notifications</span>
                  {notifications.length > 0 && (
                    <button
                      onClick={clearAllNotifications}
                      className="text-[11px] text-slate-400 hover:text-rose-400 cursor-pointer"
                    >
                      Clear all
                    </button>
                  )}
                </div>
                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="py-6 text-center text-xs text-slate-500">
                      No notifications yet
                    </div>
                  ) : (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={`p-2.5 rounded-lg text-xs cursor-pointer transition-colors ${
                          n.read ? 'bg-slate-950/50 text-slate-400' : 'bg-slate-800/80 text-slate-200 border-l-2 border-rose-500'
                        }`}
                      >
                        <div className="font-semibold text-white mb-0.5">{n.title}</div>
                        <div className="text-[11px] leading-relaxed text-slate-400">{n.message}</div>
                        <div className="text-[10px] text-slate-500 mt-1">{n.timestamp}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Authentication & Profile Block */}
          {currentUser ? (
            <div className="flex items-center gap-1.5">
              <div className="relative">
                <button
                  onClick={() => {
                    setShowUserMenu(!showUserMenu);
                    setShowNotifMenu(false);
                  }}
                  className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-[11px] font-bold ${
                    currentUser.role === 'admin'
                      ? 'bg-gradient-to-tr from-emerald-600 to-teal-500'
                      : 'bg-gradient-to-tr from-rose-500 to-indigo-600'
                  }`}>
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="text-left hidden md:block">
                    <span className="text-xs font-semibold text-slate-200 block truncate max-w-[100px] leading-tight">
                      {currentUser.name.split(' ')[0]}
                    </span>
                    <span className={`text-[9px] font-bold block leading-tight ${
                      currentUser.role === 'admin' ? 'text-emerald-400' : 'text-slate-400'
                    }`}>
                      {currentUser.role === 'admin' ? 'Theatre Admin' : 'Customer'}
                    </span>
                  </div>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl shadow-black/80 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-800">
                    <div className="text-xs font-bold text-white">{currentUser.name}</div>
                    <div className="text-[11px] text-slate-400 truncate">{currentUser.email}</div>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        currentUser.role === 'admin' 
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        {currentUser.role === 'admin' ? 'THEATRE ADMIN' : 'MOVIEGOER (CUSTOMER)'}
                      </span>
                    </div>
                  </div>

                  {/* Switch Role Toggle */}
                  <div className="px-3 py-2 border-b border-slate-800">
                    <button
                      onClick={() => {
                        toggleRole();
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-medium text-amber-300 hover:bg-amber-500/10 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                        Switch to {currentUser.role === 'admin' ? 'Customer' : 'Theatre Admin'}
                      </span>
                      <span className="text-[10px] text-slate-400">Toggle</span>
                    </button>
                  </div>

                  <div className="py-1">
                    {currentUser.role === 'admin' && (
                      <button
                        onClick={() => {
                          setShowAdminPanel(true);
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-emerald-400 hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        Cinema Admin Dashboard
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setShowBookingHistory(true);
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                    >
                      <Ticket className="w-3.5 h-3.5 text-rose-400" />
                      My Booked Tickets
                    </button>

                    <button
                      onClick={() => {
                        openAuthModal('signin');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-400 hover:text-white hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                    >
                      <UserIcon className="w-3.5 h-3.5" />
                      Switch Account
                    </button>

                    <button
                      onClick={() => {
                        logoutUser();
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-rose-400 hover:bg-slate-800 flex items-center gap-2 cursor-pointer border-t border-slate-800/80 mt-1"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Direct 1-Click Logout Button */}
            <button
              onClick={logoutUser}
              className="p-2 rounded-lg bg-slate-900 hover:bg-rose-950/50 border border-slate-800 hover:border-rose-500/40 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
              title="Sign Out / Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAuthModal('signin')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
              
              <button
                onClick={() => openAuthModal('register')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 shadow-md shadow-rose-900/30 transition-all cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Register</span>
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Mobile / Tablet Horizontal Nav Strip */}
      <div className="lg:hidden flex items-center justify-around border-t border-slate-800/80 px-2 py-1.5 bg-slate-950/80 text-xs">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => {
              setActiveNavTab(item.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs font-semibold cursor-pointer ${
              activeNavTab === item.id
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </header>
  );
};

import React from 'react';
import { Film, ShieldCheck, Ticket, User, UserPlus, LogIn } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setShowAdminPanel, setShowBookingHistory, openAuthModal, currentUser } = useApp();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white">
                <Film className="w-4 h-4" />
              </div>
              <span className="text-lg font-black text-white font-['Space_Grotesk']">
                I<span className="text-rose-500">MOVIES</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Movie ticket booking made simple. Next-generation cinema ticketing platform with real-time seat locks, multi-tier auditoriums, and contactless digital passes.
            </p>
          </div>

          {/* Formats & Experiences */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Experiences</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>IMAX with Laser & 70mm</li>
              <li>Dolby Atmos Spatial Audio</li>
              <li>4DX Environmental Motion</li>
              <li>Royal Motorized Recliners</li>
              <li>Gourmet Concessions In-Seat</li>
            </ul>
          </div>

          {/* Locations */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Cinemas</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>New York - Times Square Grand</li>
              <li>Los Angeles - Sunset Boulevard</li>
              <li>London - West End Royale</li>
              <li>Mumbai - Bandra Cineplex</li>
              <li>Chicago - River North IMAX</li>
            </ul>
          </div>

          {/* Account & Administration */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cinema & Account Portal</span>
            </h4>
            <p className="text-[11px] text-slate-400 leading-normal">
              Sign in to manage your movie tickets, or access the Theatre Administration dashboard for screen scheduling and box office analytics.
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => setShowAdminPanel(true)}
                className="w-full py-2 px-3 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 font-bold text-xs border border-emerald-500/30 text-center transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Theatre Admin Dashboard</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => openAuthModal('signin')}
                  className="py-1.5 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-medium text-xs border border-slate-800 text-center transition-colors cursor-pointer flex items-center justify-center gap-1"
                >
                  <LogIn className="w-3 h-3 text-rose-500" />
                  <span>Sign In</span>
                </button>

                <button
                  onClick={() => openAuthModal('register')}
                  className="py-1.5 px-2 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 font-semibold text-xs border border-rose-500/30 text-center transition-colors cursor-pointer flex items-center justify-center gap-1"
                >
                  <UserPlus className="w-3 h-3 text-rose-400" />
                  <span>Register</span>
                </button>
              </div>

              <button
                onClick={() => setShowBookingHistory(true)}
                className="w-full py-1.5 px-3 rounded-lg bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-white text-xs border border-slate-800/80 text-center transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Ticket className="w-3 h-3 text-rose-500" />
                <span>My Booked Tickets</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} IMovies Entertainment Systems Inc. Dedicated for Moviegoers & Cinema Administrators.
          </div>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Cinema Service</span>
            <span>·</span>
            <span>Refund & Cancellation Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import { 
  X, Lock, Mail, User as UserIcon, ShieldCheck, 
  Ticket, Phone, CheckCircle2, ArrowRight 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuthModal: React.FC = () => {
  const { 
    showAuthModal, setShowAuthModal, 
    authMode, setAuthMode, 
    registerUser, loginWithCredentials, showToast 
  } = useApp();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedRole, setSelectedRole] = useState<'user' | 'admin'>('user');

  if (!showAuthModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      showToast('Please enter your email address.', 'error');
      return;
    }

    if (authMode === 'register') {
      if (!name.trim()) {
        showToast('Please enter your full name.', 'error');
        return;
      }
      if (!password || password.length < 4) {
        showToast('Password must be at least 4 characters.', 'error');
        return;
      }
      if (password !== confirmPassword) {
        showToast('Passwords do not match. Please re-enter.', 'error');
        return;
      }

      registerUser(name.trim(), email.trim(), password, selectedRole, phone);
    } else {
      loginWithCredentials(email.trim(), password);
    }
  };

  const handleDemoLogin = (role: 'user' | 'admin') => {
    if (role === 'admin') {
      loginWithCredentials('admin@imovies.com', 'adminpassword');
    } else {
      loginWithCredentials('alex.mercer@gmail.com', 'password123');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto p-5 sm:p-6 flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={() => setShowAuthModal(false)}
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand header */}
        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-600 flex items-center justify-center text-white mx-auto mb-2.5 shadow-lg shadow-rose-600/30">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
            {authMode === 'register' ? 'Join IMovies Cinema' : 'Sign in to IMovies'}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {authMode === 'register' 
              ? 'Create your account as a Moviegoer or Theatre Admin' 
              : 'Access your ticket passes, bookings, or cinema admin portal'}
          </p>
        </div>

        {/* Tab Switcher: Sign In vs Register */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-slate-950 border border-slate-800 rounded-xl mb-5">
          <button
            type="button"
            onClick={() => setAuthMode('signin')}
            className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              authMode === 'signin'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('register')}
            className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              authMode === 'register'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Quick Demo Access Bar */}
        <div className="space-y-2 mb-4">
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider text-center">
            Instant 1-Click Demo Login
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('user')}
              className="py-2 px-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-left transition-colors cursor-pointer group"
            >
              <div className="text-xs font-bold text-white group-hover:text-rose-400 flex items-center gap-1.5">
                <Ticket className="w-3.5 h-3.5 text-rose-500" />
                <span>Customer</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Alex Mercer</div>
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin('admin')}
              className="py-2 px-2.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-950/60 border border-emerald-500/30 text-left transition-colors cursor-pointer group"
            >
              <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Theatre Admin</span>
              </div>
              <div className="text-[10px] text-emerald-400/70 mt-0.5">Cinema Manager</div>
            </button>
          </div>
        </div>

        <div className="relative my-3 flex items-center justify-center">
          <div className="w-full border-t border-slate-800" />
          <span className="absolute bg-slate-900 px-3 text-[10px] text-slate-500 uppercase tracking-wider">
            Or with your credentials
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          
          {/* Register-only: Role Selector */}
          {authMode === 'register' && (
            <div>
              <label className="text-slate-300 font-semibold block mb-1.5">Select Account Role</label>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setSelectedRole('user')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedRole === 'user'
                      ? 'bg-rose-950/30 border-rose-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-xs flex items-center gap-1.5 text-rose-400">
                    <Ticket className="w-3.5 h-3.5" />
                    <span>Customer</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 leading-tight">
                    Book tickets, food, digital QR passes
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('admin')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedRole === 'admin'
                      ? 'bg-emerald-950/30 border-emerald-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-xs flex items-center gap-1.5 text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Theatre Admin</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 leading-tight">
                    Manage movies, shows, box office
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Register-only: Name */}
          {authMode === 'register' && (
            <div>
              <label className="text-slate-400 block mb-1">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jordan Lee"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="text-slate-400 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-slate-400 block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          {/* Register-only: Confirm Password */}
          {authMode === 'register' && (
            <div>
              <label className="text-slate-400 block mb-1">Confirm Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>
          )}

          {/* Register-only: Phone */}
          {authMode === 'register' && (
            <div>
              <label className="text-slate-400 block mb-1">Phone Number (Optional)</label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-xs shadow-md shadow-rose-900/40 transition-all cursor-pointer mt-3 flex items-center justify-center gap-1.5"
          >
            <span>{authMode === 'register' ? 'Create Account & Continue' : 'Sign In to IMovies'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="text-center mt-4 pt-3 border-t border-slate-800/80">
          {authMode === 'register' ? (
            <button
              type="button"
              onClick={() => setAuthMode('signin')}
              className="text-xs text-rose-400 hover:text-rose-300 font-medium cursor-pointer"
            >
              Already have an account? <strong className="underline underline-offset-2">Sign In</strong>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setAuthMode('register')}
              className="text-xs text-rose-400 hover:text-rose-300 font-medium cursor-pointer"
            >
              Don&apos;t have an account? <strong className="underline underline-offset-2">Register Now</strong>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { MovieGrid } from './components/MovieGrid';
import { TheatresView } from './components/TheatresView';
import { ConcessionsView } from './components/ConcessionsView';
import { OffersView } from './components/OffersView';
import { MovieDetailsModal } from './components/MovieDetailsModal';
import { SeatBookingModal } from './components/SeatBookingModal';
import { TicketPassModal } from './components/TicketPassModal';
import { BookingHistoryModal } from './components/BookingHistoryModal';
import { AdminPanel } from './components/AdminPanel';
import { TrailerModal } from './components/TrailerModal';
import { AuthModal } from './components/AuthModal';
import { ToastAndConfirm } from './components/ToastAndConfirm';
import { Footer } from './components/Footer';

// Safe Error Boundary
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('IMovies runtime catch:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0b0f17] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-500 mb-4">
            🎬
          </div>
          <h1 className="text-2xl font-bold font-['Space_Grotesk']">IMovies Cinema Experience</h1>
          <p className="text-slate-400 text-sm max-w-md mt-2">
            Something temporarily interrupted the cinema projector. Tap below to reload the cinema interface cleanly.
          </p>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            className="mt-6 px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs rounded-xl shadow-lg transition-all"
          >
            Restart Cinema Engine
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Main View Router
const MainContent: React.FC = () => {
  const { activeNavTab } = useApp();

  return (
    <main className="flex-1">
      {activeNavTab === 'movies' && (
        <>
          <HeroBanner />
          <MovieGrid />
        </>
      )}

      {activeNavTab === 'theatres' && <TheatresView />}

      {activeNavTab === 'concessions' && <ConcessionsView />}

      {activeNavTab === 'offers' && <OffersView />}
    </main>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-sans selection:bg-rose-600 selection:text-white">
          
          {/* Navigation Bar */}
          <Navbar />

          {/* Active Navigation View */}
          <MainContent />

          {/* Global Modals & Overlays */}
          <MovieDetailsModal />
          <SeatBookingModal />
          <TicketPassModal />
          <BookingHistoryModal />
          <AdminPanel />
          <TrailerModal />
          <AuthModal />
          <ToastAndConfirm />

          {/* Global Footer */}
          <Footer />
          
        </div>
      </AppProvider>
    </ErrorBoundary>
  );
}

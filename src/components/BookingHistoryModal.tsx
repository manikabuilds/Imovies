import React, { useState } from 'react';
import { 
  X, Ticket, Calendar, Clock, MapPin, 
  CheckCircle2, XCircle, ArrowUpRight, AlertCircle, 
  RotateCcw 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Booking } from '../types';

export const BookingHistoryModal: React.FC = () => {
  const { 
    showBookingHistory, setShowBookingHistory, 
    bookings, cancelBooking, setActiveTicketPass,
    askConfirm 
  } = useApp();

  const [filter, setFilter] = useState<'all' | 'active' | 'cancelled'>('all');

  if (!showBookingHistory) return null;

  const filteredBookings = bookings.filter(b => {
    if (filter === 'active') return b.bookingStatus === 'Confirmed';
    if (filter === 'cancelled') return b.bookingStatus === 'Cancelled';
    return true;
  });

  const handleCancelClick = (booking: Booking) => {
    askConfirm({
      title: 'Cancel Reservation & Refund',
      message: `Cancel reservation for ${booking.movieTitle} (Seats: ${booking.seats.map(s => s.id).join(', ')})? A refund of $${booking.pricingBreakdown.total.toFixed(2)} will be credited back immediately to ${booking.paymentMethod}.`,
      confirmText: 'Confirm Cancellation',
      onConfirm: () => {
        cancelBooking(booking.id);
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-500">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">My Movie Tickets & Reservations</h3>
              <p className="text-xs text-slate-400">Manage your cinema bookings and digital entry passes</p>
            </div>
          </div>

          <button
            onClick={() => setShowBookingHistory(false)}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="px-5 py-3 bg-slate-950/60 border-b border-slate-800 flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filter === 'active' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            Active Tickets ({bookings.filter(b => b.bookingStatus === 'Confirmed').length})
          </button>
          <button
            onClick={() => setFilter('cancelled')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filter === 'cancelled' ? 'bg-rose-950/60 text-rose-400 border border-rose-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            Cancelled ({bookings.filter(b => b.bookingStatus === 'Cancelled').length})
          </button>
        </div>

        {/* Bookings List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {filteredBookings.length === 0 ? (
            <div className="py-16 text-center text-slate-500">
              <Ticket className="w-10 h-10 mx-auto mb-2 opacity-40 text-slate-400" />
              <p className="text-sm font-medium">No bookings found in this category.</p>
            </div>
          ) : (
            filteredBookings.map(b => {
              const isConfirmed = b.bookingStatus === 'Confirmed';

              return (
                <div
                  key={b.id}
                  className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between hover:border-slate-700 transition-colors"
                >
                  <div className="flex gap-3.5">
                    <img
                      src={b.moviePoster}
                      alt={b.movieTitle}
                      className="w-16 h-22 object-cover rounded-lg bg-slate-900 border border-slate-800"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{b.movieTitle}</h4>
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                          {b.movieFormat}
                        </span>
                        {isConfirmed ? (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Confirmed
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center gap-1">
                            <XCircle className="w-3 h-3" /> Cancelled
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                        <MapPin className="w-3 h-3 text-rose-500" />
                        <span>{b.theatreName}</span>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-300 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {b.showDate}
                        </span>
                        <span className="flex items-center gap-1 text-amber-400 font-semibold">
                          <Clock className="w-3 h-3" />
                          {b.showTime}
                        </span>
                      </div>

                      <div className="text-xs text-slate-400 mt-1.5">
                        Seats: <strong className="text-rose-400 font-mono">{b.seats.map(s => s.id).join(', ')}</strong> · 
                        <span className="text-slate-300 ml-1.5 font-semibold">${b.pricingBreakdown.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 pt-2 sm:pt-0 border-t sm:border-0 border-slate-800">
                    <button
                      onClick={() => {
                        setActiveTicketPass(b);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-rose-600/90 hover:bg-rose-500 text-white font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Ticket className="w-3.5 h-3.5" />
                      <span>View Pass / QR</span>
                    </button>

                    {isConfirmed && (
                      <button
                        onClick={() => handleCancelClick(b)}
                        className="text-xs text-slate-400 hover:text-rose-400 transition-colors"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};

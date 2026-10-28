import React from 'react';
import { 
  X, Printer, Share2, Film, MapPin, 
  Calendar, Clock, CheckCircle2, Download, AlertTriangle 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Booking } from '../types';

export const TicketPassModal: React.FC = () => {
  const { activeTicketPass, setActiveTicketPass, cancelBooking, showToast, askConfirm } = useApp();

  if (!activeTicketPass) return null;
  const booking = activeTicketPass;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Movie Ticket: ${booking.movieTitle}`,
        text: `Here is my booking for ${booking.movieTitle} at ${booking.theatreName} on ${booking.showDate} (${booking.showTime}). Booking Code: ${booking.bookingCode}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`Booking Code: ${booking.bookingCode} | ${booking.movieTitle} at ${booking.theatreName}`);
      showToast('Booking details copied to clipboard!', 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col">
        
        {/* Top Control Bar */}
        <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Official Digital Cinema Pass
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Share Ticket"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTicketPass(null)}
              className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* The Printable Boarding Ticket Pass */}
        <div id="printable-ticket" className="p-4 sm:p-6 overflow-y-auto">
          
          <div className="bg-gradient-to-b from-slate-950 via-[#101726] to-slate-950 rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden text-slate-200">
            
            {/* Ticket Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-rose-900/40 via-purple-900/30 to-amber-900/30 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white font-black text-sm">
                  <Film className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black tracking-wider text-white">IMOVIES PASS</div>
                  <div className="text-[10px] text-rose-400 font-semibold">{booking.movieFormat} AUDITORIUM</div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">BOOKING ID</div>
                <div className="text-sm font-extrabold text-amber-400 font-mono tracking-wider">{booking.bookingCode}</div>
              </div>
            </div>

            {/* Movie Info & Poster Row */}
            <div className="p-4 sm:p-5 flex gap-4">
              <img
                src={booking.moviePoster}
                alt={booking.movieTitle}
                className="w-20 h-28 object-cover rounded-xl shadow-md border border-slate-800"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white font-['Space_Grotesk'] leading-tight">
                    {booking.movieTitle}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                    <span className="line-clamp-1">{booking.theatreName}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {booking.screenName} · {booking.theatreCity}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
                  <div className="flex items-center gap-1 text-slate-200 font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-rose-400" />
                    <span>{booking.showDate}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-300 font-bold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{booking.showTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Perforated Divider */}
            <div className="relative py-2 flex items-center">
              <div className="absolute -left-3 w-6 h-6 rounded-full bg-slate-900 border-r border-slate-700" />
              <div className="w-full border-b border-dashed border-slate-700" />
              <div className="absolute -right-3 w-6 h-6 rounded-full bg-slate-900 border-l border-slate-700" />
            </div>

            {/* Seats & QR Section */}
            <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">RESERVED SEATS</div>
                <div className="text-2xl font-black text-rose-400 font-mono tracking-wider mt-0.5">
                  {booking.seats.map(s => s.id).join(', ')}
                </div>
                <div className="text-[11px] text-slate-300 mt-1">
                  Tier: <strong className="text-white">{booking.seats[0]?.tier} Class</strong> ({booking.seats.length} Tickets)
                </div>

                {/* Concessions note */}
                {booking.concessions.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] text-slate-300">
                    <span className="text-slate-400 font-medium">Food & Drinks: </span>
                    <span>{booking.concessions.map(c => `${c.quantity}x ${c.item.name}`).join(', ')}</span>
                  </div>
                )}

                <div className="text-[11px] text-slate-400 mt-2">
                  Guest: <span className="text-slate-200">{booking.userName}</span>
                </div>
              </div>

              {/* Scannable SVG QR Code */}
              <div className="flex flex-col items-center justify-center p-3 bg-white rounded-xl text-slate-950">
                <svg viewBox="0 0 100 100" className="w-24 h-24">
                  {/* Decorative QR matrix pattern */}
                  <rect x="5" y="5" width="25" height="25" fill="#000" />
                  <rect x="10" y="10" width="15" height="15" fill="#fff" />
                  <rect x="13" y="13" width="9" height="9" fill="#000" />

                  <rect x="70" y="5" width="25" height="25" fill="#000" />
                  <rect x="75" y="10" width="15" height="15" fill="#fff" />
                  <rect x="78" y="13" width="9" height="9" fill="#000" />

                  <rect x="5" y="70" width="25" height="25" fill="#000" />
                  <rect x="10" y="75" width="15" height="15" fill="#fff" />
                  <rect x="13" y="78" width="9" height="9" fill="#000" />

                  {/* QR internal data blocks */}
                  <rect x="36" y="8" width="6" height="6" fill="#000" />
                  <rect x="46" y="8" width="10" height="6" fill="#000" />
                  <rect x="36" y="20" width="16" height="6" fill="#000" />
                  <rect x="8" y="38" width="8" height="8" fill="#000" />
                  <rect x="22" y="38" width="12" height="6" fill="#000" />
                  <rect x="38" y="38" width="24" height="24" fill="#000" />
                  <rect x="42" y="42" width="16" height="16" fill="#fff" />
                  <rect x="46" y="46" width="8" height="8" fill="#000" />
                  <rect x="68" y="38" width="10" height="6" fill="#000" />
                  <rect x="82" y="38" width="8" height="8" fill="#000" />
                  <rect x="8" y="52" width="14" height="6" fill="#000" />
                  <rect x="70" y="52" width="18" height="6" fill="#000" />
                  <rect x="36" y="68" width="8" height="16" fill="#000" />
                  <rect x="48" y="72" width="14" height="6" fill="#000" />
                  <rect x="68" y="68" width="12" height="12" fill="#000" />
                  <rect x="84" y="82" width="8" height="8" fill="#000" />
                </svg>
                <span className="text-[10px] font-mono font-bold tracking-widest text-slate-800 mt-1 uppercase">
                  SCAN AT GATE
                </span>
              </div>
            </div>

            {/* Ticket Footer / Barcode */}
            <div className="p-3 bg-slate-950 border-t border-slate-800 text-center flex flex-col items-center justify-center">
              <div className="h-6 flex items-center justify-center gap-1 opacity-75">
                {Array.from({ length: 42 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-slate-400 h-full"
                    style={{ width: `${(i % 3 === 0 ? 3 : i % 2 === 0 ? 1 : 2)}px` }}
                  />
                ))}
              </div>
              <div className="text-[9px] font-mono text-slate-500 mt-1">
                AUTH-TXN: {booking.paymentId} · Total Paid: ${booking.pricingBreakdown.total.toFixed(2)}
              </div>
            </div>

          </div>

          {/* Cancellation Policy Banner */}
          {booking.bookingStatus === 'Confirmed' && (
            <div className="mt-4 p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-between no-print">
              <div className="text-xs text-slate-400">
                Need to change plans? Cancel up to 2 hours before showtime for full refund.
              </div>
              <button
                onClick={() => {
                  askConfirm({
                    title: 'Cancel Movie Reservation?',
                    message: `Are you sure you want to cancel booking ${booking.bookingCode} for ${booking.movieTitle}? A full refund of $${booking.pricingBreakdown.total.toFixed(2)} will be returned to your payment method.`,
                    confirmText: 'Yes, Cancel & Refund',
                    onConfirm: () => {
                      cancelBooking(booking.id);
                      setActiveTicketPass(null);
                    }
                  });
                }}
                className="text-xs text-rose-400 hover:text-rose-300 font-semibold underline underline-offset-4 cursor-pointer"
              >
                Cancel Booking
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

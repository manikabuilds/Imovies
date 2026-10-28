import React, { useState } from 'react';
import { 
  X, ChevronLeft, ChevronRight, Check, Film, 
  MapPin, Clock, Calendar, ShieldCheck, CreditCard, 
  Sparkles, Coffee, Popcorn, AlertCircle, QrCode
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SeatTier, SelectedSeat, ConcessionItem } from '../types';

export const SeatBookingModal: React.FC = () => {
  const { 
    activeBookingShow, setActiveBookingShow, 
    concessions, createBooking, setActiveTicketPass,
    currentUser, showToast 
  } = useApp();

  const [currentStep, setCurrentStep] = useState<'seats' | 'concessions' | 'checkout'>('seats');
  const [selectedSeats, setSelectedSeats] = useState<SelectedSeat[]>([]);
  const [selectedConcessions, setSelectedConcessions] = useState<{ [id: string]: number }>({});
  
  // Checkout & Payment State
  const [promoCodeInput, setPromoCodeInput] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<string>('');
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [promoError, setPromoError] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'Credit / Debit Card' | 'Instant UPI' | 'Net Banking' | 'Apple Pay'>('Credit / Debit Card');
  
  // Card form simulation
  const [cardNumber, setCardNumber] = useState<string>('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState<string>('08/28');
  const [cardCvv, setCardCvv] = useState<string>('842');
  const [upiId, setUpiId] = useState<string>('alex@okaxis');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  if (!activeBookingShow) return null;
  const { movie, show, theatre } = activeBookingShow;

  // Hall layout generation:
  // Rows: A, B (Recliner)
  // Rows: C, D, E (Prime Gold)
  // Rows: F, G, H (Classic Silver)
  // Columns: 1 to 12 with an aisle gap between 6 and 7
  const rows: { row: string; tier: SeatTier; price: number }[] = [
    { row: 'A', tier: 'Recliner', price: show.pricing.Recliner },
    { row: 'B', tier: 'Recliner', price: show.pricing.Recliner },
    { row: 'C', tier: 'Gold', price: show.pricing.Gold },
    { row: 'D', tier: 'Gold', price: show.pricing.Gold },
    { row: 'E', tier: 'Gold', price: show.pricing.Gold },
    { row: 'F', tier: 'Silver', price: show.pricing.Silver },
    { row: 'G', tier: 'Silver', price: show.pricing.Silver },
    { row: 'H', tier: 'Silver', price: show.pricing.Silver },
  ];

  const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const toggleSeat = (row: string, num: number, tier: SeatTier, price: number) => {
    const seatId = `${row}${num}`;
    if (show.bookedSeatIds.includes(seatId)) return; // Already booked

    const exists = selectedSeats.some(s => s.id === seatId);
    if (exists) {
      setSelectedSeats(prev => prev.filter(s => s.id !== seatId));
    } else {
      if (selectedSeats.length >= 8) {
        showToast('Maximum of 8 seats allowed per booking.', 'info');
        return;
      }
      setSelectedSeats(prev => [...prev, { id: seatId, row, number: num, tier, price }]);
    }
  };

  // Concessions update
  const updateConcessionQty = (itemId: string, delta: number) => {
    setSelectedConcessions(prev => {
      const current = prev[itemId] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      }
      return { ...prev, [itemId]: next };
    });
  };

  // Calculations
  const ticketsTotal = selectedSeats.reduce((acc, s) => acc + s.price, 0);
  const concessionsTotal = Object.entries(selectedConcessions).reduce((acc, [id, qty]) => {
    const item = concessions.find(c => c.id === id);
    return acc + (item ? item.price * qty : 0);
  }, 0);
  const convenienceFee = selectedSeats.length * 1.75;
  const taxableAmount = Math.max(0, ticketsTotal + concessionsTotal - promoDiscount);
  const taxes = +(taxableAmount * 0.12).toFixed(2);
  const grandTotal = +(taxableAmount + convenienceFee + taxes).toFixed(2);

  // Promo code validation
  const handleApplyPromo = () => {
    setPromoError('');
    const code = promoCodeInput.trim().toUpperCase();
    if (!code) return;

    if (code === 'FIRST50') {
      setAppliedPromo('FIRST50');
      setPromoDiscount(5.0);
    } else if (code === 'IMOVIESVIP') {
      setAppliedPromo('IMOVIESVIP');
      setPromoDiscount(+((ticketsTotal + concessionsTotal) * 0.20).toFixed(2));
    } else if (code === 'POPCORNFREE') {
      setAppliedPromo('POPCORNFREE');
      setPromoDiscount(8.50);
    } else {
      setPromoError('Invalid coupon code. Try FIRST50 or IMOVIESVIP.');
    }
  };

  // Confirm and Pay
  const handleConfirmBooking = async () => {
    if (selectedSeats.length === 0) return;
    setIsProcessing(true);

    try {
      // Simulate real bank/gateway processing latency
      await new Promise(res => setTimeout(res, 1200));

      const concessionsList = Object.entries(selectedConcessions).map(([id, qty]) => {
        const item = concessions.find(c => c.id === id)!;
        return { item, quantity: qty };
      });

      const booking = await createBooking(
        movie,
        theatre,
        show,
        selectedSeats,
        concessionsList,
        appliedPromo,
        paymentMethod
      );

      setIsProcessing(false);
      setActiveBookingShow(null);
      setActiveTicketPass(booking);
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
      showToast('Payment processing failed. Please retry.', 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col">
        
        {/* Top Header Bar */}
        <div className="px-4 sm:px-6 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (currentStep === 'checkout') setCurrentStep('concessions');
                else if (currentStep === 'concessions') setCurrentStep('seats');
                else setActiveBookingShow(null);
              }}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>{movie.title}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 font-semibold border border-rose-500/30">
                  {show.format}
                </span>
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-rose-500" />
                  {theatre.name}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  {show.date}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1 font-semibold text-white">
                  <Clock className="w-3 h-3 text-amber-400" />
                  {show.time}
                </span>
              </div>
            </div>
          </div>

          {/* Stepper Tabs */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setCurrentStep('seats')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                currentStep === 'seats' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Seats ({selectedSeats.length})
            </button>
            <button
              onClick={() => {
                if (selectedSeats.length > 0) setCurrentStep('concessions');
              }}
              disabled={selectedSeats.length === 0}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                currentStep === 'concessions' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-slate-200 disabled:opacity-40'
              }`}
            >
              2. F&B Concessions
            </button>
            <button
              onClick={() => {
                if (selectedSeats.length > 0) setCurrentStep('checkout');
              }}
              disabled={selectedSeats.length === 0}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                currentStep === 'checkout' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-slate-200 disabled:opacity-40'
              }`}
            >
              3. Payment
            </button>
          </div>

          <button
            onClick={() => setActiveBookingShow(null)}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body Step 1: Interactive Cinema Seat Layout */}
        {currentStep === 'seats' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center">
            
            {/* Cinema Curved Screen Projection Visual */}
            <div className="w-full max-w-2xl mb-8 flex flex-col items-center">
              <div className="relative w-full h-8 overflow-hidden flex items-center justify-center">
                <div className="w-4/5 h-12 border-t-4 border-rose-500 rounded-t-[100%] shadow-[0_-12px_24px_rgba(244,63,94,0.35)]" />
              </div>
              <span className="text-[10px] tracking-[0.25em] text-slate-400 font-bold uppercase -mt-2">
                All Eyes This Way · Cinema Screen
              </span>
            </div>

            {/* Seat Legend */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-300 mb-6 bg-slate-950/60 px-4 py-2.5 rounded-xl border border-slate-800">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded bg-slate-800 border border-slate-700" />
                <span className="text-[11px] text-slate-400">Available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded bg-rose-600 border border-rose-500 shadow-sm shadow-rose-600/50" />
                <span className="text-[11px] text-slate-200 font-medium">Selected</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded bg-slate-950 border border-slate-800 opacity-40 cursor-not-allowed" />
                <span className="text-[11px] text-slate-500">Reserved / Sold</span>
              </div>
              <div className="h-3 w-px bg-slate-800" />
              <div className="text-[11px] text-slate-400">
                <span className="text-amber-400 font-bold">Recliner</span>: ${show.pricing.Recliner.toFixed(0)} · 
                <span className="text-rose-400 font-bold ml-1.5">Gold</span>: ${show.pricing.Gold.toFixed(0)} · 
                <span className="text-slate-300 font-bold ml-1.5">Silver</span>: ${show.pricing.Silver.toFixed(0)}
              </div>
            </div>

            {/* Seating Grid */}
            <div className="w-full max-w-3xl overflow-x-auto pb-4">
              <div className="min-w-[620px] space-y-2.5">
                {rows.map(({ row, tier, price }) => (
                  <div key={row} className="flex items-center justify-center gap-3">
                    
                    {/* Row Letter Left */}
                    <span className="w-6 text-xs font-bold text-slate-500 text-center">{row}</span>

                    {/* Seats with Center Aisle */}
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      {cols.map(num => {
                        const seatId = `${row}${num}`;
                        const isBooked = show.bookedSeatIds.includes(seatId);
                        const isSelected = selectedSeats.some(s => s.id === seatId);
                        const isAisleGap = num === 6;

                        // Tier colors
                        const tierColor = tier === 'Recliner' 
                          ? 'border-amber-500/50 hover:border-amber-400' 
                          : tier === 'Gold' 
                          ? 'border-rose-500/40 hover:border-rose-400' 
                          : 'border-slate-700 hover:border-slate-500';

                        return (
                          <React.Fragment key={num}>
                            <button
                              onClick={() => toggleSeat(row, num, tier, price)}
                              disabled={isBooked}
                              title={`${row}${num} (${tier} - $${price})`}
                              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-[10px] font-semibold transition-all flex items-center justify-center cursor-pointer ${
                                isBooked
                                  ? 'bg-slate-950/80 text-slate-700 border border-slate-900 cursor-not-allowed opacity-35'
                                  : isSelected
                                  ? 'bg-rose-600 text-white font-bold border border-rose-400 shadow-md shadow-rose-600/50 scale-105'
                                  : `bg-slate-800/90 text-slate-300 ${tierColor} border hover:bg-slate-700`
                              }`}
                            >
                              {num}
                            </button>
                            {isAisleGap && <div className="w-6 sm:w-8" aria-hidden="true" />}
                          </React.Fragment>
                        );
                      })}
                    </div>

                    {/* Row Letter Right */}
                    <span className="w-6 text-xs font-bold text-slate-500 text-center">{row}</span>

                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Floating Seat Selection Bar */}
            <div className="w-full max-w-3xl mt-4 pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs text-slate-400">
                  {selectedSeats.length === 0 ? (
                    <span>Please tap on seats to select (Max 8 seats)</span>
                  ) : (
                    <span>Selected: <strong className="text-white">{selectedSeats.map(s => s.id).join(', ')}</strong></span>
                  )}
                </div>
                <div className="text-base font-extrabold text-white mt-0.5">
                  Tickets Total: <span className="text-rose-400">${ticketsTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentStep('concessions')}
                  disabled={selectedSeats.length === 0}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-xs transition-all shadow-md shadow-rose-900/30 cursor-pointer"
                >
                  <span>Proceed to Concessions</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Modal Body Step 2: Food & Concessions Cart */}
        {currentStep === 'concessions' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Popcorn className="w-4 h-4 text-amber-400" />
                  <span>Grab Concessions & Cinema Snacks</span>
                </h3>
                <p className="text-xs text-slate-400">Delivered directly to your seats or pickup at express counter</p>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400">Concessions Total: </span>
                <span className="text-sm font-bold text-rose-400">${concessionsTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Concession Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {concessions.map(item => {
                const qty = selectedConcessions[item.id] || 0;
                return (
                  <div
                    key={item.id}
                    className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 flex gap-3.5 hover:border-slate-700 transition-colors"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover bg-slate-900 flex-shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="text-xs font-bold text-white line-clamp-1">{item.name}</h4>
                          {item.isVeg && (
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-emerald-300" title="Pure Veg" />
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5 leading-snug">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-800/80">
                        <span className="text-xs font-bold text-amber-400">${item.price.toFixed(2)}</span>
                        
                        {/* Quantity Counter */}
                        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-2 py-0.5">
                          <button
                            onClick={() => updateConcessionQty(item.id, -1)}
                            disabled={qty === 0}
                            className="text-xs text-slate-400 hover:text-white disabled:opacity-30 px-1 font-bold"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold text-white min-w-[14px] text-center">{qty}</span>
                          <button
                            onClick={() => updateConcessionQty(item.id, 1)}
                            className="text-xs text-slate-400 hover:text-white px-1 font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setCurrentStep('seats')}
                className="text-xs text-slate-400 hover:text-white"
              >
                Back to Seats
              </button>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentStep('checkout')}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-semibold text-xs shadow-md shadow-rose-900/30 cursor-pointer"
                >
                  <span>Continue to Payment (${(ticketsTotal + concessionsTotal).toFixed(2)})</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Modal Body Step 3: Checkout & Payment Gateway */}
        {currentStep === 'checkout' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Payment Methods & Details */}
              <div className="lg:col-span-7 space-y-5">
                
                {/* User & Contact details */}
                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                    Customer Contact & Ticket Delivery
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500">Name</span>
                      <div className="text-white font-medium mt-0.5">{currentUser?.name || 'Guest Moviegoer'}</div>
                    </div>
                    <div>
                      <span className="text-slate-500">Email</span>
                      <div className="text-white font-medium mt-0.5">{currentUser?.email || 'guest@imovies.com'}</div>
                    </div>
                    <div>
                      <span className="text-slate-500">Phone</span>
                      <div className="text-white font-medium mt-0.5">{currentUser?.phone || '+1 (555) 234-8901'}</div>
                    </div>
                    <div>
                      <span className="text-slate-500">Delivery</span>
                      <div className="text-emerald-400 font-medium mt-0.5 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Instant QR Pass
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Choose Payment Method
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                    {(['Credit / Debit Card', 'Instant UPI', 'Net Banking', 'Apple Pay'] as const).map(method => (
                      <button
                        key={method}
                        onClick={() => setPaymentMethod(method)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                          paymentMethod === method
                            ? 'bg-rose-600/15 border-rose-500 text-rose-400 shadow-sm'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>

                  {/* Payment form mock */}
                  {paymentMethod === 'Credit / Debit Card' ? (
                    <div className="space-y-3">
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-rose-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] text-slate-400 block mb-1">Valid Thru (MM/YY)</label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-rose-500"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-slate-400 block mb-1">CVV / CVC</label>
                          <input
                            type="password"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-rose-500"
                          />
                        </div>
                      </div>
                    </div>
                  ) : paymentMethod === 'Instant UPI' ? (
                    <div className="space-y-3">
                      <label className="text-[11px] text-slate-400 block">Enter UPI ID / VPA</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@okhdfcbank"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-rose-500"
                      />
                      <div className="flex items-center gap-2 p-2.5 bg-slate-900/80 rounded-lg border border-slate-800 text-[11px] text-slate-400">
                        <QrCode className="w-4 h-4 text-rose-500" />
                        <span>Dynamic QR verification active on confirmation</span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-xs text-slate-300">
                      Redirecting securely to verified {paymentMethod} authentication portal upon clicking confirm.
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-4 text-[11px] text-slate-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>256-bit SSL encrypted secure cinema payment gateway</span>
                  </div>
                </div>

              </div>

              {/* Right Column: Order Summary & Promo Code */}
              <div className="lg:col-span-5 space-y-4">
                
                {/* Promo Code Input */}
                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Promo Code / Gift Voucher
                  </h4>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. FIRST50 or IMOVIESVIP"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white uppercase placeholder:normal-case focus:outline-none focus:border-rose-500"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {appliedPromo && (
                    <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1 font-medium">
                      <Check className="w-3.5 h-3.5" /> Promo code {appliedPromo} applied (-${promoDiscount.toFixed(2)})
                    </div>
                  )}
                  {promoError && (
                    <div className="text-xs text-rose-400 mt-2">
                      {promoError}
                    </div>
                  )}
                  <div className="mt-2 text-[10px] text-slate-500">
                    Try codes: <strong className="text-slate-400">FIRST50</strong> ($5 off) or <strong className="text-slate-400">IMOVIESVIP</strong> (20% off)
                  </div>
                </div>

                {/* Final Bill Breakdown */}
                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2.5">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Order Summary
                  </h4>

                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Tickets ({selectedSeats.length} seats)</span>
                    <span>${ticketsTotal.toFixed(2)}</span>
                  </div>

                  {concessionsTotal > 0 && (
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>F&B Concessions</span>
                      <span>${concessionsTotal.toFixed(2)}</span>
                    </div>
                  )}

                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-xs text-emerald-400 font-medium">
                      <span>Discount ({appliedPromo})</span>
                      <span>-${promoDiscount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Convenience Fee</span>
                    <span>${convenienceFee.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Integrated Cinema Tax (12%)</span>
                    <span>${taxes.toFixed(2)}</span>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                    <span className="text-sm font-bold text-white">Grand Total</span>
                    <span className="text-xl font-extrabold text-rose-400">${grandTotal.toFixed(2)}</span>
                  </div>

                  {/* Pay CTA */}
                  <button
                    onClick={handleConfirmBooking}
                    disabled={isProcessing}
                    className="w-full mt-3 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-rose-900/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processing Reservation...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Pay ${grandTotal.toFixed(2)} & Confirm</span>
                      </>
                    )}
                  </button>

                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

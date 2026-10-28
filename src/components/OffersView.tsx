import React from 'react';
import { Tag, Sparkles, Copy, Check, Ticket, Gift } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const OffersView: React.FC = () => {
  const { showToast, setActiveNavTab } = useApp();

  const offers = [
    {
      code: 'FIRST50',
      title: 'First Time Booking Delight',
      discount: '$5.00 OFF',
      description: 'Get an instant $5 discount on your cinema tickets when booking online through IMovies.',
      expiry: 'Valid all season',
      tag: 'POPULAR'
    },
    {
      code: 'IMOVIESVIP',
      title: 'VIP Premiere Privilege',
      discount: '20% OFF TOTAL',
      description: 'Enjoy 20% off on your entire reservation including premium tickets and gourmet cinema concessions.',
      expiry: 'Limited Time',
      tag: 'BEST VALUE'
    },
    {
      code: 'POPCORNFREE',
      title: 'Free Gourmet Popcorn',
      discount: '$8.50 SAVINGS',
      description: 'Get a complimentary tub of Jumbo Golden Butter Popcorn on booking two or more tickets.',
      expiry: 'Weekend Special',
      tag: 'CONCESSIONS'
    }
  ];

  const handleCopyCode = (code: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
    }
    showToast(`Coupon code ${code} copied to clipboard! Paste at checkout.`, 'success');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="pb-6 border-b border-slate-800">
        <h2 className="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk'] flex items-center gap-2">
          <Tag className="w-6 h-6 text-rose-500" />
          <span>Exclusive Cinema Offers & Promo Vouchers</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Apply any of these verified promo codes during checkout to unlock special ticket discounts and concessions savings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        {offers.map(offer => (
          <div
            key={offer.code}
            className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-rose-500/50 transition-all shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  {offer.tag}
                </span>
                <span className="text-[11px] text-slate-400">{offer.expiry}</span>
              </div>

              <div className="text-xl font-black text-white mt-3 font-['Space_Grotesk']">
                {offer.discount}
              </div>
              <h3 className="text-sm font-bold text-slate-200 mt-0.5">{offer.title}</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {offer.description}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
              <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-dashed border-slate-700 font-mono text-xs font-bold text-amber-400">
                {offer.code}
              </div>
              <button
                onClick={() => handleCopyCode(offer.code)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Code</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gradient-to-r from-rose-950/30 to-amber-950/30 border border-rose-500/20 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Gift className="w-4 h-4 text-rose-500" />
            <span>Ready to book your movie experience?</span>
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">Browse current blockbusters in IMAX 3D, Dolby Atmos, and 4DX.</p>
        </div>
        <button
          onClick={() => setActiveNavTab('movies')}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 text-white font-bold text-xs shadow-md shadow-rose-900/30 whitespace-nowrap cursor-pointer hover:from-rose-500 hover:to-rose-600 transition-all"
        >
          Explore Now Showing
        </button>
      </div>
    </section>
  );
};

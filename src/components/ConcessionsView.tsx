import React, { useState } from 'react';
import { Popcorn, Coffee, Sparkles, Plus, Check, Utensils } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ConcessionsView: React.FC = () => {
  const { concessions, showToast, setActiveNavTab } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Popcorn', 'Snacks', 'Beverages', 'Combos'];

  const filteredItems = concessions.filter(item => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk'] flex items-center gap-2">
            <Popcorn className="w-6 h-6 text-amber-400" />
            <span>IMovies Cinema Gourmet & Concessions</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Handcrafted artisanal popcorn, molten cheese nachos, and fountain refreshments delivered directly to your seat.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Concession Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="group bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all shadow-xl flex flex-col justify-between"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-bold text-slate-300 border border-white/10">
                {item.category}
              </div>
              {item.isVeg && (
                <div className="absolute top-3 right-3 bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  100% Veg
                </div>
              )}
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-white text-sm group-hover:text-rose-400 transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-sm font-extrabold text-amber-400 font-mono">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  {item.description}
                </p>
                {item.calories && (
                  <div className="text-[10px] text-slate-500 mt-2 font-mono">
                    {item.calories} Calories · Freshly Prepared Daily
                  </div>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Available at all concessions</span>
                <button
                  onClick={() => {
                    showToast(`Select your movie showtime to pair with ${item.name}!`, 'info');
                    setActiveNavTab('movies');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-400 hover:text-white font-semibold text-xs border border-rose-500/30 transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Book with Ticket</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

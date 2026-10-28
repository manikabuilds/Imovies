import React from 'react';
import { MapPin, Film, Sparkles, Clock, Check, Layers, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Theatre, Show } from '../types';

export const TheatresView: React.FC = () => {
  const { theatres, shows, movies, selectedCity, setActiveBookingShow, setActiveMovieModal } = useApp();

  const cityTheatres = theatres.filter(t => t.city.toLowerCase() === selectedCity.toLowerCase());
  const displayTheatres = cityTheatres.length > 0 ? cityTheatres : theatres;
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk']">
            Cinemas & Multiplexes in <span className="text-rose-500">{selectedCity}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Experience state-of-the-art IMAX 70mm, Dolby Atmos soundscapes, and motorized recliners.
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
          {displayTheatres.length} Multiplexes Active
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 pt-6">
        {displayTheatres.map(theatre => {
          const theatreShows = shows.filter(s => s.theatreId === theatre.id && s.date === todayStr);

          return (
            <div
              key={theatre.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 hover:border-slate-700 transition-all shadow-xl"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-4 border-b border-slate-800/80">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
                      {theatre.name}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/15 text-rose-400 border border-rose-500/30">
                      {theatre.city}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                    <span>{theatre.address}</span>
                    {theatre.distanceKm && (
                      <span className="text-slate-500 ml-1">({theatre.distanceKm} km away)</span>
                    )}
                  </div>
                </div>

                {/* Amenities Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {theatre.amenities.map(a => (
                    <span
                      key={a}
                      className="text-[10px] font-semibold text-slate-300 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              {/* Screens info */}
              <div className="py-3 flex flex-wrap gap-3 text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Screens:</span>
                {theatre.screens.map(sc => (
                  <span key={sc.id} className="text-slate-300 bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800/80">
                    {sc.name} ({sc.format} · {sc.totalSeats} seats)
                  </span>
                ))}
              </div>

              {/* Today's Showtimes at this theatre */}
              <div className="mt-2 pt-3 border-t border-slate-800/80">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-rose-500" />
                    Today&apos;s Showtimes
                  </h4>
                  <span className="text-[11px] text-slate-500">Tap time slot to reserve seats</span>
                </div>

                {theatreShows.length === 0 ? (
                  <p className="text-xs text-slate-500 italic py-2">
                    No remaining shows today at this location. Check upcoming dates or switch cities.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {theatreShows.map(show => {
                      const movie = movies.find(m => m.id === show.movieId);
                      if (!movie) return null;

                      return (
                        <div
                          key={show.id}
                          className="bg-slate-950/90 border border-slate-800/90 rounded-xl p-3 flex items-center justify-between gap-3 hover:border-rose-500/50 transition-colors"
                        >
                          <div className="flex items-center gap-2.5 overflow-hidden">
                            <img
                              src={movie.posterUrl}
                              alt={movie.title}
                              className="w-10 h-14 object-cover rounded-md flex-shrink-0"
                            />
                            <div className="overflow-hidden">
                              <div
                                onClick={() => setActiveMovieModal(movie)}
                                className="text-xs font-bold text-white truncate hover:text-rose-400 cursor-pointer"
                              >
                                {movie.title}
                              </div>
                              <div className="text-[10px] text-rose-400 font-semibold mt-0.5">
                                {show.format} · {show.time}
                              </div>
                              <div className="text-[10px] text-slate-400 mt-0.5">
                                From ${show.pricing.Silver.toFixed(0)}
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => setActiveBookingShow({ movie, show, theatre })}
                            className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs whitespace-nowrap transition-colors shadow-sm cursor-pointer"
                          >
                            Book
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
};

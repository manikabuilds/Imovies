import React, { useState } from 'react';
import { 
  X, Play, Star, Clock, Calendar, MapPin, 
  Sparkles, Check, MessageSquare, Info 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Movie, Show, Theatre } from '../types';

export const MovieDetailsModal: React.FC = () => {
  const { 
    activeMovieModal, setActiveMovieModal, 
    theatres, shows, selectedCity,
    setActiveBookingShow, setActiveTrailerMovie 
  } = useApp();

  const [selectedDateOffset, setSelectedDateOffset] = useState<number>(0);
  const [newReviewText, setNewReviewText] = useState<string>('');
  const [newRating, setNewRating] = useState<number>(9);
  const [showReviewInput, setShowReviewInput] = useState<boolean>(false);

  if (!activeMovieModal) return null;
  const movie = activeMovieModal;

  // Generate 7 days of dates starting today
  const dateOptions = Array.from({ length: 7 }).map((_, idx) => {
    const d = new Date();
    d.setDate(d.getDate() + idx);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = idx === 0 ? 'Today' : idx === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNumber = d.getDate();
    const monthName = d.toLocaleDateString('en-US', { month: 'short' });
    return { offset: idx, dateStr, dayName, dayNumber, monthName };
  });

  const activeDate = dateOptions[selectedDateOffset].dateStr;

  // Theatres in selected city
  const cityTheatres = theatres.filter(t => t.city.toLowerCase() === selectedCity.toLowerCase());
  const displayTheatres = cityTheatres.length > 0 ? cityTheatres : theatres;

  // Get shows for this movie and selected date
  const getShowsForTheatre = (theatreId: string): Show[] => {
    return shows.filter(
      s => s.movieId === movie.id && s.theatreId === theatreId && s.date === activeDate
    );
  };

  const handleSelectShow = (theatre: Theatre, show: Show) => {
    setActiveMovieModal(null);
    setActiveBookingShow({ movie, show, theatre });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={() => setActiveMovieModal(null)}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-white/10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1">
          
          {/* Header Banner */}
          <div className="relative h-64 sm:h-80 w-full bg-slate-950">
            <img
              src={movie.backdropUrl}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
            
            {/* Play Trailer Floating Button */}
            <button
              onClick={() => setActiveTrailerMovie(movie)}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 px-4 py-2.5 rounded-full bg-rose-600/90 hover:bg-rose-500 text-white font-medium text-xs shadow-xl backdrop-blur-sm transition-all transform hover:scale-105"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Watch Trailer</span>
            </button>

            {/* Movie Title & Badges in Banner Bottom */}
            <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 mb-1">
                  <span>{movie.ageRating}</span>
                  <span>·</span>
                  <span>{movie.genres.join(', ')}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-amber-400">
                    <Star className="w-3 h-3 fill-amber-400" />
                    {movie.rating} ({movie.votesCount.toLocaleString()} votes)
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
                  {movie.title}
                </h2>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{Math.floor(movie.durationMinutes / 60)}h {movie.durationMinutes % 60}m</span>
                <span>·</span>
                <span>Directed by {movie.director}</span>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-4 sm:p-6 space-y-6">
            
            {/* Synopsis */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Synopsis</h4>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                {movie.synopsis}
              </p>
            </div>

            {/* Cast Members */}
            {movie.cast && movie.cast.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Top Cast</h4>
                <div className="flex items-center gap-4 overflow-x-auto pb-2">
                  {movie.cast.map(c => (
                    <div key={c.name} className="flex items-center gap-2.5 bg-slate-800/60 border border-slate-800 rounded-xl p-2 pr-4 min-w-[170px]">
                      <img
                        src={c.photo}
                        alt={c.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <div className="text-xs font-semibold text-white">{c.name}</div>
                        <div className="text-[11px] text-slate-400">{c.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Showtime Selection Section (Only if movie is now showing) */}
            {movie.isNowShowing ? (
              <div className="pt-2 border-t border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-rose-500" />
                      <span>Select Showtime & Experience</span>
                    </h3>
                    <p className="text-xs text-slate-400">Shows available in {selectedCity}</p>
                  </div>
                </div>

                {/* Date Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4">
                  {dateOptions.map(opt => (
                    <button
                      key={opt.offset}
                      onClick={() => setSelectedDateOffset(opt.offset)}
                      className={`flex flex-col items-center justify-center min-w-[70px] px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                        selectedDateOffset === opt.offset
                          ? 'bg-rose-600 border-rose-500 text-white shadow-md shadow-rose-900/30'
                          : 'bg-slate-800/80 border-slate-700/60 text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-semibold opacity-80">{opt.dayName}</span>
                      <span className="text-base font-extrabold">{opt.dayNumber}</span>
                      <span className="text-[10px] opacity-80">{opt.monthName}</span>
                    </button>
                  ))}
                </div>

                {/* Theatres & Show Slots */}
                <div className="space-y-4">
                  {displayTheatres.map(theatre => {
                    const theatreShows = getShowsForTheatre(theatre.id);
                    return (
                      <div key={theatre.id} className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                          <div>
                            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-rose-500" />
                              {theatre.name}
                            </h4>
                            <p className="text-[11px] text-slate-400">{theatre.address}</p>
                          </div>
                          
                          {/* Amenities */}
                          <div className="flex flex-wrap gap-1">
                            {theatre.amenities.slice(0, 3).map(a => (
                              <span key={a} className="text-[9px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                                {a}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Showtimes Grid */}
                        {theatreShows.length === 0 ? (
                          <div className="text-xs text-slate-500 italic py-2">
                            No shows scheduled for {dateOptions[selectedDateOffset].dayName}. Try another date.
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-2.5">
                            {theatreShows.map(show => {
                              const bookedCount = show.bookedSeatIds.length;
                              const isFillingFast = bookedCount >= 8;

                              return (
                                <button
                                  key={show.id}
                                  onClick={() => handleSelectShow(theatre, show)}
                                  className="group flex flex-col items-center p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-rose-500 hover:bg-rose-950/20 transition-all text-left cursor-pointer min-w-[110px]"
                                >
                                  <div className="text-xs font-bold text-white group-hover:text-rose-400">
                                    {show.time}
                                  </div>
                                  <div className="text-[10px] font-semibold text-rose-400">
                                    {show.format}
                                  </div>
                                  <div className="text-[9px] text-slate-500 mt-0.5 flex items-center gap-1">
                                    <span>From ${show.pricing.Silver.toFixed(0)}</span>
                                    {isFillingFast && (
                                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" title="Filling fast" />
                                    )}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>

              </div>
            ) : (
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-center">
                <p className="text-xs text-amber-300 font-medium">
                  This title is releasing on {movie.releaseDate}. Advance ticket bookings open 3 days prior to release.
                </p>
              </div>
            )}

            {/* Audience Reviews Section */}
            <div className="pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-rose-500" />
                  Audience Reviews ({movie.reviews?.length || 0})
                </h4>
                <button
                  onClick={() => setShowReviewInput(!showReviewInput)}
                  className="text-xs text-rose-400 hover:text-rose-300 font-medium"
                >
                  {showReviewInput ? 'Cancel' : '+ Write a Review'}
                </button>
              </div>

              {/* Review input */}
              {showReviewInput && (
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-300 font-medium">Your Rating:</span>
                    <div className="flex items-center gap-1">
                      {[6, 7, 8, 9, 10].map(val => (
                        <button
                          key={val}
                          onClick={() => setNewRating(val)}
                          className={`w-7 h-7 rounded text-xs font-bold transition-colors ${
                            newRating === val ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    rows={2}
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    placeholder="Share your cinema experience, acting, visual effects..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-rose-500"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        if (!newReviewText.trim()) return;
                        if (!movie.reviews) movie.reviews = [];
                        movie.reviews.unshift({
                          id: `rev-${Date.now()}`,
                          author: 'You (Verified Cinephile)',
                          rating: newRating,
                          date: 'Just now',
                          comment: newReviewText.trim()
                        });
                        setNewReviewText('');
                        setShowReviewInput(false);
                      }}
                      className="px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs rounded-lg transition-colors"
                    >
                      Post Review
                    </button>
                  </div>
                </div>
              )}

              {/* Review list */}
              <div className="space-y-2.5">
                {movie.reviews && movie.reviews.length > 0 ? (
                  movie.reviews.map(rev => (
                    <div key={rev.id} className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-white">{rev.author}</span>
                        <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>{rev.rating}/10</span>
                          <span className="text-[10px] text-slate-500 ml-1 font-normal">{rev.date}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-300">{rev.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 italic">No reviews yet. Be the first to review!</p>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

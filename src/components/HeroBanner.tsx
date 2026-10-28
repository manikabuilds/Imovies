import React, { useState, useEffect } from 'react';
import { Play, Ticket, Star, Clock, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HeroBanner: React.FC = () => {
  const { movies, setActiveMovieModal, setActiveTrailerMovie } = useApp();
  const spotlightMovies = movies.filter(m => m.isNowShowing).slice(0, 3);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (spotlightMovies.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % spotlightMovies.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [spotlightMovies.length]);

  if (spotlightMovies.length === 0) return null;
  const movie = spotlightMovies[currentIndex];

  return (
    <div className="relative w-full h-[480px] sm:h-[540px] overflow-hidden bg-slate-950 border-b border-slate-800">
      {/* Background Backdrop Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 transform scale-105"
        style={{ backgroundImage: `url('${movie.backdropUrl}')` }}
      >
        {/* Cinematic Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-[#0b0f17]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f17] via-[#0b0f17]/80 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12 sm:pb-16 z-10">
        <div className="max-w-2xl space-y-4">
          
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 font-medium">
            <span className="flex items-center gap-1 text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {movie.rating} / 10
            </span>
            <span className="flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {Math.floor(movie.durationMinutes / 60)}h {movie.durationMinutes % 60}m
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-rose-400 font-semibold">{movie.ageRating}</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-300">{movie.genres.join(', ')}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight font-['Space_Grotesk']">
            {movie.title}
          </h1>

          {/* Tagline */}
          <p className="text-sm sm:text-base text-slate-300 italic font-light">
            &ldquo;{movie.tagline}&rdquo;
          </p>

          {/* Synopsis preview */}
          <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 max-w-xl leading-relaxed">
            {movie.synopsis}
          </p>

          {/* Formats */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Experience in:</span>
            {movie.formats.map(fmt => (
              <span key={fmt} className="text-[10px] font-bold text-slate-300 bg-slate-900/90 border border-slate-700/80 px-2 py-0.5 rounded">
                {fmt}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => setActiveMovieModal(movie)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-semibold text-sm shadow-lg shadow-rose-600/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Ticket className="w-4 h-4" />
              <span>Book Tickets</span>
            </button>

            <button
              onClick={() => setActiveTrailerMovie(movie)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-medium text-sm border border-slate-700 backdrop-blur-sm transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-slate-300 text-slate-300" />
              <span>Watch Trailer</span>
            </button>
          </div>

        </div>

        {/* Carousel indicators */}
        {spotlightMovies.length > 1 && (
          <div className="absolute right-4 sm:right-8 bottom-8 flex items-center gap-2">
            {spotlightMovies.map((m, idx) => (
              <button
                key={m.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  currentIndex === idx ? 'w-8 bg-rose-500' : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

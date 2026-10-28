import React from 'react';
import { X, Ticket, Star, Film } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TrailerModal: React.FC = () => {
  const { activeTrailerMovie, setActiveTrailerMovie, setActiveMovieModal } = useApp();

  if (!activeTrailerMovie) return null;
  const movie = activeTrailerMovie;

  // Extract YouTube ID or fallback to standard embed
  let embedUrl = 'https://www.youtube.com/embed/Way9Dexny3w?autoplay=1';
  if (movie.trailerYoutubeUrl) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = movie.trailerYoutubeUrl.match(regExp);
    if (match && match[2].length === 11) {
      embedUrl = `https://www.youtube.com/embed/${match[2]}?autoplay=1`;
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col">
        
        {/* Header */}
        <div className="p-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Film className="w-4 h-4 text-rose-500" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Official Trailer: {movie.title}
            </span>
          </div>

          <button
            onClick={() => setActiveTrailerMovie(null)}
            className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={embedUrl}
            title={`${movie.title} Official Trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* Bottom CTA Row */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-bold text-white">{movie.title}</h4>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
              <span>{movie.genres.join(', ')}</span>
              <span>·</span>
              <span className="text-amber-400 font-semibold">{movie.rating}/10</span>
              <span>·</span>
              <span>{movie.durationMinutes} min</span>
            </div>
          </div>

          {movie.isNowShowing && (
            <button
              onClick={() => {
                setActiveTrailerMovie(null);
                setActiveMovieModal(movie);
              }}
              className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-semibold text-xs shadow-md shadow-rose-900/30 cursor-pointer"
            >
              <Ticket className="w-4 h-4" />
              <span>Book Showtimes Now</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

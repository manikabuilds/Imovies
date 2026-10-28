import React, { useState, useMemo } from 'react';
import { 
  Star, Clock, Play, Ticket, Filter, 
  Film, Sparkles, Calendar, Layers 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Movie } from '../types';

export const MovieGrid: React.FC = () => {
  const { 
    movies, searchQuery, 
    selectedGenre, setSelectedGenre, 
    selectedLanguage, setSelectedLanguage, 
    selectedFormat, setSelectedFormat,
    setActiveMovieModal, setActiveTrailerMovie 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'now_showing' | 'coming_soon'>('now_showing');

  // Available unique genres, languages, and formats
  const genres = ['All', 'Action', 'Sci-Fi', 'Adventure', 'Drama', 'Animation', 'Crime', 'Thriller'];
  const languages = ['All', 'English', 'Spanish', 'French', 'Japanese', 'German'];
  const formats = ['All', 'IMAX 3D', 'Dolby Atmos', '4DX', '3D', '2D'];

  // Filter logic
  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      // Tab filter
      if (activeTab === 'now_showing' && !movie.isNowShowing) return false;
      if (activeTab === 'coming_soon' && !movie.isUpcoming) return false;

      // Genre filter
      if (selectedGenre !== 'All' && !movie.genres.includes(selectedGenre)) return false;

      // Language filter
      if (selectedLanguage !== 'All' && !movie.languages.includes(selectedLanguage)) return false;

      // Format filter
      if (selectedFormat !== 'All' && !movie.formats.includes(selectedFormat as any)) return false;

      // Search Query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = movie.title.toLowerCase().includes(query);
        const matchDirector = movie.director.toLowerCase().includes(query);
        const matchGenre = movie.genres.some(g => g.toLowerCase().includes(query));
        const matchCast = movie.cast.some(c => c.name.toLowerCase().includes(query));
        const matchSynopsis = movie.synopsis.toLowerCase().includes(query);
        return matchTitle || matchDirector || matchGenre || matchCast || matchSynopsis;
      }

      return true;
    });
  }, [movies, activeTab, selectedGenre, selectedLanguage, selectedFormat, searchQuery]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Top Filter & Segmented Tabs Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        
        {/* Now Showing vs Coming Soon Tabs */}
        <div className="inline-flex p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            onClick={() => setActiveTab('now_showing')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'now_showing'
                ? 'bg-gradient-to-r from-rose-600 to-rose-700 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Now Showing ({movies.filter(m => m.isNowShowing).length})</span>
          </button>

          <button
            onClick={() => setActiveTab('coming_soon')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'coming_soon'
                ? 'bg-gradient-to-r from-rose-600 to-rose-700 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Coming Soon ({movies.filter(m => m.isUpcoming).length})</span>
          </button>
        </div>

        {/* Secondary Filters: Format & Language Dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Format selector */}
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs text-slate-300">
            <Layers className="w-3.5 h-3.5 text-rose-500" />
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              aria-label="Filter by format"
              className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
            >
              {formats.map(fmt => (
                <option key={fmt} value={fmt} className="bg-slate-900 text-slate-200">
                  {fmt === 'All' ? 'All Formats' : fmt}
                </option>
              ))}
            </select>
          </div>

          {/* Language selector */}
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs text-slate-300">
            <span className="text-[11px] text-slate-500 font-semibold uppercase">Lang:</span>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              aria-label="Filter by language"
              className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
            >
              {languages.map(lang => (
                <option key={lang} value={lang} className="bg-slate-900 text-slate-200">
                  {lang === 'All' ? 'All Languages' : lang}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters if any active */}
          {(selectedGenre !== 'All' || selectedLanguage !== 'All' || selectedFormat !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedGenre('All');
                setSelectedLanguage('All');
                setSelectedFormat('All');
              }}
              className="text-xs text-rose-400 hover:text-rose-300 underline underline-offset-4 px-2"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Genre Pills Slider */}
      <div className="flex items-center gap-2 py-4 overflow-x-auto no-scrollbar">
        {genres.map(genre => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              selectedGenre === genre
                ? 'bg-white text-slate-950 font-bold shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/80'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Movies Grid */}
      {filteredMovies.length === 0 ? (
        <div className="py-20 text-center bg-slate-900/30 rounded-2xl border border-dashed border-slate-800">
          <Film className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-300">No movies found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
            Try adjusting your genre, format, or search keywords to find what you are looking for.
          </p>
          <button
            onClick={() => {
              setSelectedGenre('All');
              setSelectedLanguage('All');
              setSelectedFormat('All');
            }}
            className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs text-white rounded-lg transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6 pt-2">
          {filteredMovies.map(movie => (
            <div
              key={movie.id}
              className="group bg-slate-900/70 border border-slate-800/90 rounded-2xl overflow-hidden hover:border-slate-700 hover:shadow-xl hover:shadow-rose-950/20 transition-all flex flex-col justify-between"
            >
              {/* Poster Container */}
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-950">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Rating Badge */}
                <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10 flex items-center gap-1 text-[11px] font-bold text-amber-400">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>{movie.rating}</span>
                </div>

                {/* Age Rating Badge */}
                <div className="absolute top-2.5 right-2.5 bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded-md border border-white/10 text-[10px] font-semibold text-slate-300">
                  {movie.ageRating}
                </div>

                {/* Hover Quick Overlay with Trailer Button */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-4">
                  <button
                    onClick={() => setActiveTrailerMovie(movie)}
                    className="w-12 h-12 rounded-full bg-rose-600/90 hover:bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-600/40 transform hover:scale-110 transition-transform cursor-pointer"
                    title="Watch Trailer"
                  >
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </button>
                  <span className="text-[11px] text-white font-medium">Watch Trailer</span>
                </div>

                {/* Format Tags at bottom of poster */}
                <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1">
                  {movie.formats.slice(0, 2).map(f => (
                    <span key={f} className="text-[9px] font-bold bg-slate-950/90 backdrop-blur-sm text-slate-200 px-1.5 py-0.5 rounded border border-white/10">
                      {f}
                    </span>
                  ))}
                  {movie.formats.length > 2 && (
                    <span className="text-[9px] font-bold bg-slate-950/90 text-slate-400 px-1.5 py-0.5 rounded border border-white/10">
                      +{movie.formats.length - 2}
                    </span>
                  )}
                </div>
              </div>

              {/* Movie Details */}
              <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-rose-400 transition-colors line-clamp-1">
                    {movie.title}
                  </h3>
                  
                  {/* Genres */}
                  <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                    {movie.genres.join(' · ')}
                  </div>

                  {/* Duration & Language */}
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1.5">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {Math.floor(movie.durationMinutes / 60)}h {movie.durationMinutes % 60}m
                    </span>
                    <span>·</span>
                    <span>{movie.languages[0]}</span>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-3 mt-3 border-t border-slate-800/80">
                  {movie.isNowShowing ? (
                    <button
                      onClick={() => setActiveMovieModal(movie)}
                      className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-medium text-xs transition-colors shadow-sm cursor-pointer"
                    >
                      <Ticket className="w-3.5 h-3.5" />
                      <span>Book Seats</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveMovieModal(movie)}
                      className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-colors cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>Notify & View</span>
                    </button>
                  )}
                </div>

              </div>

            </div>
          ))}
        </div>
      )}

    </section>
  );
};

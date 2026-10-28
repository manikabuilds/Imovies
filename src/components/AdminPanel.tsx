import React, { useState } from 'react';
import { 
  X, ShieldCheck, Film, Calendar, Plus, 
  Trash2, DollarSign, Users, Ticket, TrendingUp, 
  Clock, MapPin, Check, Layers, AlertCircle 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Movie, Show } from '../types';

export const AdminPanel: React.FC = () => {
  const { 
    showAdminPanel, setShowAdminPanel, 
    movies, addMovie, deleteMovie, 
    theatres, shows, addShow, deleteShow, 
    bookings, askConfirm 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'movies' | 'shows' | 'bookings'>('overview');

  // Form states for adding movie
  const [showAddMovieForm, setShowAddMovieForm] = useState<boolean>(false);
  const [movieTitle, setMovieTitle] = useState('');
  const [movieSynopsis, setMovieSynopsis] = useState('');
  const [movieGenres, setMovieGenres] = useState('Action, Sci-Fi');
  const [movieDuration, setMovieDuration] = useState(145);
  const [moviePoster, setMoviePoster] = useState('https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80');
  const [movieBackdrop, setMovieBackdrop] = useState('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80');
  const [movieRating, setMovieRating] = useState(8.5);
  const [movieDirector, setMovieDirector] = useState('Denis Villeneuve');
  const [movieAgeRating, setMovieAgeRating] = useState<'PG' | 'PG-13' | 'R' | 'U/A 13+' | 'U/A 16+'>('PG-13');

  // Form states for adding show
  const [showAddShowForm, setShowAddShowForm] = useState<boolean>(false);
  const [selectedMovieId, setSelectedMovieId] = useState(movies[0]?.id || '');
  const [selectedTheatreId, setSelectedTheatreId] = useState(theatres[0]?.id || '');
  const [showDate, setShowDate] = useState(new Date().toISOString().split('T')[0]);
  const [showTime, setShowTime] = useState('07:30 PM');
  const [showFormat, setShowFormat] = useState<'2D' | '3D' | 'IMAX 3D' | '4DX' | 'Dolby Atmos'>('IMAX 3D');
  const [silverPrice, setSilverPrice] = useState(15);
  const [goldPrice, setGoldPrice] = useState(20);
  const [reclinerPrice, setReclinerPrice] = useState(28);

  if (!showAdminPanel) return null;

  // Metrics
  const totalRevenue = bookings
    .filter(b => b.bookingStatus === 'Confirmed')
    .reduce((acc, b) => acc + b.pricingBreakdown.total, 0);

  const totalTicketsSold = bookings
    .filter(b => b.bookingStatus === 'Confirmed')
    .reduce((acc, b) => acc + b.seats.length, 0);

  const totalSeatsInShows = shows.reduce((acc, s) => acc + 96, 0);
  const totalBookedInShows = shows.reduce((acc, s) => acc + s.bookedSeatIds.length, 0);
  const occupancyRate = totalSeatsInShows > 0 ? Math.round((totalBookedInShows / totalSeatsInShows) * 100) : 0;

  const handleSaveMovie = (e: React.FormEvent) => {
    e.preventDefault();
    if (!movieTitle.trim()) return;

    addMovie({
      title: movieTitle,
      slug: movieTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      tagline: 'Experience the cinematic spectacle.',
      synopsis: movieSynopsis || 'An exciting new cinematic masterpiece.',
      posterUrl: moviePoster,
      backdropUrl: movieBackdrop,
      trailerYoutubeUrl: 'https://www.youtube.com/watch?v=Way9Dexny3w',
      durationMinutes: Number(movieDuration),
      rating: Number(movieRating),
      votesCount: 1200,
      ageRating: movieAgeRating,
      genres: movieGenres.split(',').map(g => g.trim()),
      languages: ['English'],
      releaseDate: new Date().toISOString().split('T')[0],
      director: movieDirector,
      cast: [
        { name: 'Lead Actor', role: 'Protagonist', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' }
      ],
      formats: ['IMAX 3D', 'Dolby Atmos', '2D'],
      isNowShowing: true,
      isUpcoming: false
    });

    setMovieTitle('');
    setMovieSynopsis('');
    setShowAddMovieForm(false);
  };

  const handleSaveShow = (e: React.FormEvent) => {
    e.preventDefault();
    const theatre = theatres.find(t => t.id === selectedTheatreId) || theatres[0];
    const screenId = theatre.screens[0]?.id || 'sc-1';

    addShow({
      movieId: selectedMovieId,
      theatreId: selectedTheatreId,
      screenId,
      date: showDate,
      time: showTime,
      format: showFormat,
      language: 'English',
      pricing: {
        Silver: Number(silverPrice),
        Gold: Number(goldPrice),
        Recliner: Number(reclinerPrice)
      },
      bookedSeatIds: []
    });

    setShowAddShowForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Cinema Operations & Admin Portal</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ADMIN ACCESS
                </span>
              </div>
              <p className="text-xs text-slate-400">Manage catalog, scheduled showtimes, seat inventory, and revenue</p>
            </div>
          </div>

          <button
            onClick={() => setShowAdminPanel(false)}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 py-2.5 bg-slate-950/60 border-b border-slate-800 flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'overview', label: 'Analytics & KPIs' },
            { id: 'movies', label: `Movie Catalog (${movies.length})` },
            { id: 'shows', label: `Shows Schedule (${shows.length})` },
            { id: 'bookings', label: `All Bookings (${bookings.length})` }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === t.id
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: OVERVIEW & ANALYTICS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Total Revenue</span>
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black text-emerald-400 mt-2 font-mono">
                    ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">Confirmed transactions</div>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Tickets Sold</span>
                    <Ticket className="w-4 h-4 text-rose-500" />
                  </div>
                  <div className="text-2xl font-black text-white mt-2 font-mono">
                    {totalTicketsSold}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">Across all screens</div>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Seat Occupancy</span>
                    <TrendingUp className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-black text-amber-400 mt-2 font-mono">
                    {occupancyRate}%
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">{totalBookedInShows} / {totalSeatsInShows} reserved</div>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Active Theatres</span>
                    <MapPin className="w-4 h-4 text-sky-400" />
                  </div>
                  <div className="text-2xl font-black text-white mt-2 font-mono">
                    {theatres.length}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">Metropolitan multiplexes</div>
                </div>
              </div>

              {/* Quick Actions / Tips */}
              <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  System Health & Real-time Booking Engine
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-400">
                  <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                    <span className="text-white font-medium block">Seat Lock Protocol</span>
                    Real-time lock prevention prevents double bookings when two guests click the same seat.
                  </div>
                  <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                    <span className="text-white font-medium block">Instant Refund Engine</span>
                    1-click customer cancellation triggers automated seat freeing and wallet refund.
                  </div>
                  <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                    <span className="text-white font-medium block">Dynamic QR Verification</span>
                    Scannable SVG QR codes rendered uniquely per booking code for gate entry.
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: MOVIE MANAGEMENT */}
          {activeTab === 'movies' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Movie Titles & Scheduling</h4>
                  <p className="text-xs text-slate-400">Add new movies or update active showings</p>
                </div>
                <button
                  onClick={() => setShowAddMovieForm(!showAddMovieForm)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{showAddMovieForm ? 'Cancel' : 'Add Movie'}</span>
                </button>
              </div>

              {/* Add Movie Form */}
              {showAddMovieForm && (
                <form onSubmit={handleSaveMovie} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="text-slate-400 block mb-1">Movie Title</label>
                      <input
                        type="text"
                        required
                        value={movieTitle}
                        onChange={(e) => setMovieTitle(e.target.value)}
                        placeholder="e.g. Gladiator II"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-rose-500"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">Director</label>
                      <input
                        type="text"
                        value={movieDirector}
                        onChange={(e) => setMovieDirector(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-rose-500"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">Genres (comma-separated)</label>
                      <input
                        type="text"
                        value={movieGenres}
                        onChange={(e) => setMovieGenres(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-rose-500"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">Duration (minutes)</label>
                      <input
                        type="number"
                        value={movieDuration}
                        onChange={(e) => setMovieDuration(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-rose-500"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-slate-400 block mb-1">Poster URL</label>
                      <input
                        type="url"
                        value={moviePoster}
                        onChange={(e) => setMoviePoster(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-rose-500"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs rounded-lg transition-colors"
                    >
                      Save Movie to Catalog
                    </button>
                  </div>
                </form>
              )}

              {/* Movies Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-semibold">
                    <tr>
                      <th className="p-3">Poster</th>
                      <th className="p-3">Title & Director</th>
                      <th className="p-3">Genres</th>
                      <th className="p-3">Runtime</th>
                      <th className="p-3">Rating</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/60">
                    {movies.map(m => (
                      <tr key={m.id} className="hover:bg-slate-800/40">
                        <td className="p-3">
                          <img src={m.posterUrl} alt={m.title} className="w-9 h-12 object-cover rounded bg-slate-950" />
                        </td>
                        <td className="p-3">
                          <div className="font-bold text-white">{m.title}</div>
                          <div className="text-[11px] text-slate-400">{m.director} · {m.ageRating}</div>
                        </td>
                        <td className="p-3 text-slate-300">{m.genres.join(', ')}</td>
                        <td className="p-3 text-slate-300">{m.durationMinutes}m</td>
                        <td className="p-3 text-amber-400 font-semibold">{m.rating}/10</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => {
                              askConfirm({
                                title: 'Delete Movie?',
                                message: `Permanently remove "${m.title}" and its scheduled shows from the cinema catalog?`,
                                confirmText: 'Yes, Delete',
                                onConfirm: () => {
                                  deleteMovie(m.id);
                                }
                              });
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors cursor-pointer"
                            title="Delete Movie"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB 3: SHOWS SCHEDULE */}
          {activeTab === 'shows' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Auditorium Shows & Pricing</h4>
                  <p className="text-xs text-slate-400">Schedule showtimes for any theater screen with tier pricing</p>
                </div>
                <button
                  onClick={() => setShowAddShowForm(!showAddShowForm)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{showAddShowForm ? 'Cancel' : 'Schedule Show'}</span>
                </button>
              </div>

              {/* Add Show Form */}
              {showAddShowForm && (
                <form onSubmit={handleSaveShow} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="text-slate-400 block mb-1">Movie</label>
                      <select
                        value={selectedMovieId}
                        onChange={(e) => setSelectedMovieId(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-rose-500"
                      >
                        {movies.map(m => (
                          <option key={m.id} value={m.id}>{m.title}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1">Theatre</label>
                      <select
                        value={selectedTheatreId}
                        onChange={(e) => setSelectedTheatreId(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-rose-500"
                      >
                        {theatres.map(t => (
                          <option key={t.id} value={t.id}>{t.name} ({t.city})</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1">Format</label>
                      <select
                        value={showFormat}
                        onChange={(e) => setShowFormat(e.target.value as any)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-rose-500"
                      >
                        {(['IMAX 3D', 'Dolby Atmos', '4DX', '3D', '2D'] as const).map(f => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1">Show Date</label>
                      <input
                        type="date"
                        value={showDate}
                        onChange={(e) => setShowDate(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-rose-500"
                      />
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1">Showtime</label>
                      <input
                        type="text"
                        value={showTime}
                        onChange={(e) => setShowTime(e.target.value)}
                        placeholder="e.g. 07:15 PM"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-rose-500"
                      />
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1">Pricing (Silver / Gold / Recliner)</label>
                      <div className="flex gap-1.5">
                        <input
                          type="number"
                          value={silverPrice}
                          onChange={(e) => setSilverPrice(Number(e.target.value))}
                          title="Silver"
                          className="w-1/3 bg-slate-900 border border-slate-800 rounded-lg p-2 text-white text-center"
                        />
                        <input
                          type="number"
                          value={goldPrice}
                          onChange={(e) => setGoldPrice(Number(e.target.value))}
                          title="Gold"
                          className="w-1/3 bg-slate-900 border border-slate-800 rounded-lg p-2 text-white text-center"
                        />
                        <input
                          type="number"
                          value={reclinerPrice}
                          onChange={(e) => setReclinerPrice(Number(e.target.value))}
                          title="Recliner"
                          className="w-1/3 bg-slate-900 border border-slate-800 rounded-lg p-2 text-white text-center"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs rounded-lg transition-colors"
                    >
                      Publish Show
                    </button>
                  </div>
                </form>
              )}

              {/* Shows List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {shows.map(s => {
                  const movie = movies.find(m => m.id === s.movieId);
                  const theatre = theatres.find(t => t.id === s.theatreId);

                  return (
                    <div key={s.id} className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white text-xs flex items-center gap-2">
                          <span>{movie?.title || 'Unknown Movie'}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-400 font-semibold">
                            {s.format}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {theatre?.name} · {s.date} at <strong className="text-amber-400">{s.time}</strong>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-1">
                          Booked: {s.bookedSeatIds.length} seats · Rates: ${s.pricing.Silver} / ${s.pricing.Gold} / ${s.pricing.Recliner}
                        </div>
                      </div>

                      <button
                        onClick={() => deleteShow(s.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-900 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* TAB 4: ALL BOOKINGS AUDIT */}
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white">Live Transactions & Bookings Auditor</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-semibold">
                    <tr>
                      <th className="p-3">Booking Code</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Movie & Theatre</th>
                      <th className="p-3">Show</th>
                      <th className="p-3">Seats</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/60">
                    {bookings.map(b => (
                      <tr key={b.id} className="hover:bg-slate-800/40">
                        <td className="p-3 font-mono font-bold text-amber-400">{b.bookingCode}</td>
                        <td className="p-3">
                          <div className="text-white font-medium">{b.userName}</div>
                          <div className="text-[10px] text-slate-500">{b.userEmail}</div>
                        </td>
                        <td className="p-3">
                          <div className="text-white font-medium">{b.movieTitle}</div>
                          <div className="text-[10px] text-slate-400">{b.theatreName}</div>
                        </td>
                        <td className="p-3 text-slate-300">
                          {b.showDate} {b.showTime}
                        </td>
                        <td className="p-3 font-mono text-rose-400 font-bold">
                          {b.seats.map(s => s.id).join(', ')}
                        </td>
                        <td className="p-3 font-bold text-emerald-400">
                          ${b.pricingBreakdown.total.toFixed(2)}
                        </td>
                        <td className="p-3">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            b.bookingStatus === 'Confirmed'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          }`}>
                            {b.bookingStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

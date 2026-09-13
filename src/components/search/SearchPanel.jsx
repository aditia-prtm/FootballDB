import { useState } from 'react';
import { Search, X } from 'lucide-react';
import PopularSearches from './PopularSearches';

export function SearchPanel({ onSearchSubmit }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearchSubmit(query.trim());
    }
  };

  const clearQuery = () => {
    setQuery('');
  };

  const handlePopularClick = (name) => {
    setQuery(name);
    onSearchSubmit(name);
  };

  return (
    <div className="flex flex-col justify-center">
      {/* Title & Subtitle */}
      <div>
        <h1 className="font-title text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
          Temukan <br />
          <span className="text-yellow-400">Pemain Sepak Bola</span>
        </h1>
        <p className="text-gray-400 text-sm sm:text-base mt-3 max-w-lg leading-relaxed">
          Jelajahi profil lengkap dan statistik ribuan pemain sepak bola dari berbagai liga dunia.
        </p>
      </div>

      {/* Search Input & Button */}
      <form onSubmit={handleSubmit} className="relative mt-6 space-y-3">
        <div className="relative">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <Search size={18} />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama pemain ..."
            className="w-full bg-[#151515] border border-[#1a1a1a] focus:border-yellow-500 rounded-xl pl-11 pr-11 py-3 text-sm text-gray-100 placeholder:text-gray-500 focus:outline-none transition-colors"
          />
          {query ? (
            <button
              type="button"
              onClick={clearQuery}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 cursor-pointer"
              title="Hapus teks"
            >
              <X size={16} />
            </button>
          ) : null}
        </div>

        {/* Primary Search Button */}
        <button
          type="submit"
          className="w-full py-3 px-4 rounded-xl bg-yellow-600 hover:bg-yellow-500 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
        >
          <Search size={16} />
          Cari Pemain
        </button>
      </form>

      {/* Sering Dicari / Popular tags */}
      <PopularSearches onSelect={handlePopularClick} />

      {/* Footer attribution */}
      <div className="mt-6 pt-4 border-t border-[#1a1a1a] text-xs text-gray-500">
        <p>
          Data disediakan oleh{' '}
          <a
            href="https://www.thesportsdb.com/"
            target="_blank"
            rel="noreferrer"
            className="text-yellow-400 hover:underline font-medium"
          >
            TheSportsDB
          </a>
        </p>
      </div>
    </div>
  );
}

export default SearchPanel;

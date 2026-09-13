import { Search } from 'lucide-react';

export function FavoritesFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) {
  return (
    <div className="mt-6 pt-5 border-t border-[#1a1a1a] flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Filter Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-yellow-600 text-white shadow-xs'
                : 'bg-[#0a0a0a] text-gray-400 hover:text-gray-200 hover:bg-[#1a1a1a] border border-[#1a1a1a]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Quick Search Input */}
      <div className="relative w-full md:w-64">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari nama atau klub..."
          className="w-full bg-[#0a0a0a] border border-[#1a1a1a] focus:border-yellow-500 rounded-xl pl-9 pr-3 py-1.5 text-xs text-gray-100 placeholder:text-gray-500 focus:outline-none transition-colors"
        />
      </div>
    </div>
  );
}

export default FavoritesFilter;

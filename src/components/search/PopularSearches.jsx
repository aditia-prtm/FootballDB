import { POPULAR_SEARCHES } from '../../lib/constants';

export function PopularSearches({ onSelect }) {
  return (
    <div className="mt-6">
      <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2.5">
        Sering Dicari
      </h3>
      <div className="flex flex-wrap gap-2">
        {POPULAR_SEARCHES.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => onSelect(name)}
            className="px-3 py-1.5 rounded-lg bg-[#151515] hover:bg-[#1a1a1a] border border-[#1a1a1a] text-xs text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PopularSearches;

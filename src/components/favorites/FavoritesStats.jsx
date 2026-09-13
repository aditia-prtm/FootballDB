export function FavoritesStats({ stats }) {
  return (
    <div className="flex items-center gap-3 self-start md:self-auto">
      <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl px-3.5 py-2 text-center">
        <span className="block text-[10px] text-gray-400 font-medium uppercase tracking-wider">
          Total Tersimpan
        </span>
        <span className="block text-base font-bold text-yellow-400">
          {stats.total}
        </span>
      </div>

      <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl px-3.5 py-2 text-center">
        <span className="block text-[10px] text-gray-400 font-medium uppercase tracking-wider">
          Klub Berbeda
        </span>
        <span className="block text-base font-bold text-gray-200">
          {stats.uniqueClubs}
        </span>
      </div>

      {stats.customCount > 0 && (
        <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl px-3.5 py-2 text-center">
          <span className="block text-[10px] text-gray-400 font-medium uppercase tracking-wider">
            Kustom
          </span>
          <span className="block text-base font-bold text-yellow-400">
            {stats.customCount}
          </span>
        </div>
      )}
    </div>
  );
}

export default FavoritesStats;

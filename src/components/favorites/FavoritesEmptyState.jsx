import { Link } from 'react-router';
import { Star, Search, Plus } from 'lucide-react';

export function FavoritesEmptyState({ onOpenCustomModal }) {
  return (
    <div className="bg-[#151515] border border-[#1a1a1a] rounded-2xl flex flex-col items-center justify-center py-16 px-6 text-center shadow-sm max-w-lg mx-auto">
      <div className="w-14 h-14 rounded-2xl bg-[#151515] border border-[#1a1a1a] flex items-center justify-center mb-4 text-yellow-400">
        <Star size={26} className="fill-yellow-400/20 text-yellow-400" />
      </div>
      <h2 className="font-title text-lg font-bold text-white">
        Belum Ada Pemain Favorit
      </h2>
      <p className="text-xs text-gray-400 mt-2 max-w-sm leading-relaxed">
        Tandai pemain dari hasil pencarian atau tambahkan profil pemain kustom buatanmu sendiri ke daftar ini.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#151515] hover:bg-[#1a1a1a] border border-[#1a1a1a] text-gray-200 font-semibold text-xs transition-colors cursor-pointer"
        >
          <Search size={14} />
          <span>Cari Pemain</span>
        </Link>
        <button
          onClick={onOpenCustomModal}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-yellow-600 hover:bg-yellow-500 text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer"
        >
          <Plus size={14} />
          <span>Tambah Pemain Sendiri</span>
        </button>
      </div>
    </div>
  );
}

export default FavoritesEmptyState;

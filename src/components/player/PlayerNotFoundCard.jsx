import { SearchX, RotateCcw } from 'lucide-react';
import Badge from '../common/Badge';

export function PlayerNotFoundCard({ error, onReset }) {
  return (
    <div className="w-full">
      {/* Header section above card */}
      <div className="flex items-center justify-between mb-2.5 px-1">
        <div>
          <h3 className="font-title text-lg font-semibold text-white">
            Hasil Pencarian
          </h3>
          <p className="text-sm text-gray-400">
            Pencarian tidak membuahkan hasil
          </p>
        </div>
        <Badge variant="rose" size="sm">
          Tidak Ditemukan
        </Badge>
      </div>

      {/* Main Solid Dark Card */}
      <div className="bg-[#151515] border border-[#1a1a1a] rounded-2xl p-6 shadow-sm flex flex-col justify-between h-[440px]">
        {/* Top / Center Content */}
        <div className="my-auto flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-3 shadow-inner">
            <SearchX size={28} />
          </div>

          <h4 className="font-title text-base font-bold text-white mb-1">
            Pemain Tidak Ditemukan
          </h4>
          <p className="text-xs text-gray-400 max-w-xs mb-4">
            {error || 'Data profil pemain tidak ditemukan dalam database.'}
          </p>

          <div className="w-full bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-3.5 text-left text-xs space-y-1.5">
            <p className="font-semibold text-gray-300 text-[11px] uppercase tracking-wider">
              Tips Pencarian:
            </p>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-gray-400">
              <li>Pastikan ejaan nama pemain sudah benar</li>
              <li>Coba gunakan nama populer atau nama keluarga</li>
              <li>Gunakan kata kunci pencarian yang lebih singkat</li>
            </ul>
          </div>
        </div>

        {/* Action Button: Kembali ke Pemain Default */}
        {onReset && (
          <div className="pt-3 border-t border-[#1a1a1a]">
            <button
              type="button"
              onClick={onReset}
              className="w-full py-2.5 px-3 rounded-xl bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 hover:text-yellow-300 text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw size={14} />
              <span>Kembali ke Pemain Unggulan</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlayerNotFoundCard;

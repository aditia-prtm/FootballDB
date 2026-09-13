import { Loader2 } from 'lucide-react';
import Badge from '../common/Badge';

export function PlayerLoadingCard({ isDefault }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2.5 px-1">
        <div>
          <h3 className="font-title text-sm font-semibold text-white">
            {isDefault ? 'Greatest of All Time' : 'Hasil Pencarian'}
          </h3>
          <p className="text-[11px] text-gray-400">
            Memuat data pemain...
          </p>
        </div>
        <Badge variant="amber" size="xs">
          Memuat
        </Badge>
      </div>

      <div className="bg-[#151515] border border-[#1a1a1a] rounded-2xl h-[440px] flex items-center justify-center p-6 shadow-sm">
        <div className="flex flex-col items-center gap-2.5 text-gray-400">
          <Loader2 size={24} className="animate-spin text-yellow-400" />
          <p className="text-xs font-medium">Mengambil profil pemain...</p>
        </div>
      </div>
    </div>
  );
}

export default PlayerLoadingCard;

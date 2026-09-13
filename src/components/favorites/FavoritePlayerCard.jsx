import { Trash2, ChevronRight, Shield, Flag, User } from 'lucide-react';
import Badge from '../common/Badge';

export function FavoritePlayerCard({ player, onRemove, onOpenDetail, loadingDetail }) {
  const playerImage = player.strCutout || player.strThumb;

  return (
    <div className="bg-[#151515] border border-[#1a1a1a] hover:border-yellow-500/50 rounded-2xl overflow-hidden shadow-sm transition-all group relative">
      {/* Position and Custom Badges */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
        <Badge variant="yellow" size="xs" className="backdrop-blur-sm">
          {player.strPosition || 'Pemain'}
        </Badge>
        {player.isCustom && (
          <Badge variant="amber" size="xs" className="backdrop-blur-sm">
            Kustom
          </Badge>
        )}
      </div>

      {/* Remove Favorite Button */}
      <button
        onClick={() => onRemove(player.idPlayer)}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-lg bg-[#0a0a0a]/80 border border-[#1a1a1a] text-gray-400 hover:text-red-400 hover:border-red-500/40 hover:bg-red-500/10 backdrop-blur-sm transition-all flex items-center justify-center cursor-pointer"
        title="Hapus dari favorit"
      >
        <Trash2 size={14} />
      </button>

      {/* Player Image Section */}
      <div className="relative h-48 bg-[#0a0a0a] flex items-center justify-center p-6 group-hover:bg-[#0f0f0f] transition-colors">
        <div className="absolute w-32 h-32 rounded-full bg-[#0a0a0a] border border-[#1a1a1a]" />
        {playerImage ? (
          <img
            src={playerImage}
            alt={player.strPlayer}
            className="relative z-10 h-full max-h-40 object-contain group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <div className="relative z-10 w-20 h-20 rounded-full bg-[#151515] flex items-center justify-center text-gray-400">
            <User size={32} />
          </div>
        )}
      </div>

      {/* Player Info Section */}
      <div className="p-4">
        <h3 className="font-title text-lg font-bold text-white truncate mb-3">
          {player.strPlayer}
        </h3>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-2.5">
            <div className="flex items-center gap-1.5 text-gray-400 text-[10px] mb-1">
              <Shield size={11} className="text-yellow-400" />
              <span className="uppercase tracking-wider">Klub</span>
            </div>
            <p className="text-xs font-semibold text-gray-200 truncate">
              {player.strTeam || '-'}
            </p>
          </div>

          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-2.5">
            <div className="flex items-center gap-1.5 text-gray-400 text-[10px] mb-1">
              <Flag size={11} className="text-yellow-400" />
              <span className="uppercase tracking-wider">Negara</span>
            </div>
            <p className="text-xs font-semibold text-gray-200 truncate">
              {player.strNationality || '-'}
            </p>
          </div>
        </div>

        {/* View Profile Button */}
        <button
          onClick={() => onOpenDetail(player)}
          disabled={loadingDetail}
          className="w-full py-2.5 px-3 rounded-xl bg-[#0a0a0a] hover:bg-yellow-600 border border-[#1a1a1a] hover:border-yellow-600 text-gray-200 hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          Lihat Profil
          <ChevronRight size={13} />
        </button>
      </div>
    </div>
  );
}

export default FavoritePlayerCard;

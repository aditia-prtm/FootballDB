import { useState } from 'react';
import {
  Star,
  Shield,
  Flag,
  User,
  ExternalLink,
} from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import PlayerLoadingCard from './PlayerLoadingCard';
import PlayerNotFoundCard from './PlayerNotFoundCard';
import PlayerDetailModal from './PlayerDetailModal';
import Badge from '../common/Badge';

export function PlayerCard({ player, loading, error, isDefault, onReset }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [modalOpen, setModalOpen] = useState(false);

  if (loading) {
    return <PlayerLoadingCard isDefault={isDefault} />;
  }

  if (error || !player) {
    return <PlayerNotFoundCard error={error} onReset={onReset} />;
  }

  const favored = isFavorite(player.idPlayer);
  const playerImage = player.strCutout || player.strRender || player.strThumb;

  const handleToggleFavorite = () => {
    toggleFavorite({
      idPlayer: player.idPlayer,
      strPlayer: player.strPlayer,
      strTeam: player.strTeam,
      strNationality: player.strNationality,
      strPosition: player.strPosition,
      strThumb: player.strCutout || player.strThumb,
    });
  };

  return (
    <div className="w-full">
      {/* Header section above card */}
      <div className="flex items-center justify-between mb-2.5 px-1">
        <div>
          <h3 className="font-title text-lg font-semibold text-white">
            {isDefault ? 'Greatest of All Time' : 'Hasil Pencarian'}
          </h3>
          <p className="text-sm text-gray-400">
            {isDefault ? 'Pemain terbaik sepanjang masa' : 'Profil pemain ditemukan'}
          </p>
        </div>
      </div>

      {/* Main Solid Dark Card */}
      <div className="bg-[#151515] border border-[#1a1a1a] rounded-2xl p-5 shadow-sm flex flex-col justify-between h-[440px]">
        {/* Card Header: Player Name + Favorite Star Button */}
        <div className="flex items-center justify-between">
          <h2 className="font-title text-xl font-bold text-white truncate max-w-[240px]">
            {player.strPlayer}
          </h2>
          <button
            onClick={handleToggleFavorite}
            className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-colors cursor-pointer ${
              favored
                ? 'bg-yellow-500/15 border-yellow-500/40 text-yellow-500'
                : 'bg-[#151515] border-[#1a1a1a] text-gray-400 hover:text-yellow-500 hover:bg-[#1a1a1a]'
            }`}
            title={favored ? 'Hapus dari favorit' : 'Tambah ke favorit'}
          >
            <Star size={16} className={favored ? 'fill-yellow-500' : ''} />
          </button>
        </div>

        {/* Player Cutout in Center */}
        <div className="relative my-auto h-48 flex items-center justify-center">
          <div className="absolute w-36 h-36 rounded-full bg-[#0a0a0a] border border-[#1a1a1a]" />
          {playerImage ? (
            <img
              src={playerImage}
              alt={player.strPlayer}
              className="relative z-10 h-full max-h-48 object-contain"
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

        {/* Player Details Rows */}
        <div className="space-y-2 pt-2 border-t border-[#1a1a1a]">
          {/* POSISI */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400 font-medium uppercase text-[10px] tracking-wider">
              Posisi
            </span>
            <Badge variant="yellow" size="xs">
              {player.strPosition || 'Forward'}
            </Badge>
          </div>

          {/* KLUB */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-gray-400">
              <Shield size={13} className="text-gray-500" />
              <span className="uppercase text-[10px] tracking-wider">Klub</span>
            </div>
            <span className="font-semibold text-gray-200">
              {player.strTeam || '-'}
            </span>
          </div>

          {/* NEGARA */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-gray-400">
              <Flag size={13} className="text-gray-500" />
              <span className="uppercase text-[10px] tracking-wider">Negara</span>
            </div>
            <span className="font-semibold text-gray-200">
              {player.strNationality || '-'}
            </span>
          </div>
        </div>

        {/* Action Button: Lihat Profil */}
        <div className="mt-3">
          <button
            onClick={() => setModalOpen(true)}
            className="w-full py-2.5 px-3 rounded-xl bg-[#151515] hover:bg-[#1a1a1a] border border-[#1a1a1a] text-gray-200 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            Lihat Profil
            <ExternalLink size={12} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Modal Detail Pop-up */}
      <PlayerDetailModal
        player={player}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}

export default PlayerCard;

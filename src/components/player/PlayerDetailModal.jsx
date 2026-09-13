import {
  X,
  MapPin,
  Calendar,
  Shirt,
  User,
  ExternalLink,
  Star,
  Shield,
} from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import { calculateAge, formatMediaUrl } from '../../lib/utils';
import { InstagramIcon, TwitterIcon } from '../common/SocialIcons';
import Badge from '../common/Badge';

export function PlayerDetailModal({ player, isOpen, onClose }) {
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!isOpen || !player) return null;

  const favored = isFavorite(player.idPlayer);
  const playerImage = player.strCutout || player.strRender || player.strThumb;
  const age = calculateAge(player.dateBorn);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#151515] border border-[#1a1a1a] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#1a1a1a] flex items-center justify-between bg-[#1a1a1a]">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-[#0a0a0a] border border-[#1a1a1a] flex items-center justify-center flex-shrink-0 overflow-hidden">
              {playerImage ? (
                <img
                  src={playerImage}
                  alt={player.strPlayer}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              ) : (
                <User size={20} className="text-gray-400" />
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="font-title text-base font-bold text-white truncate">
                  {player.strPlayer}
                </h2>
                {player.strPosition && (
                  <Badge variant="yellow" size="xs">
                    {player.strPosition}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-gray-400 truncate mt-0.5">
                {[player.strTeam, player.strNationality]
                  .filter(Boolean)
                  .join(' · ') || 'Pemain Sepak Bola'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#151515] text-gray-400 hover:text-white hover:bg-[#151515] flex items-center justify-center transition-colors flex-shrink-0 ml-3 cursor-pointer"
            title="Tutup"
          >
            <X size={16} />
          </button>
        </div>

        {/* Streamlined Body */}
        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* 4 Essential Stats */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-gray-400 text-[11px] mb-1">
                <MapPin size={13} className="text-yellow-400" />
                <span>Kebangsaan</span>
              </div>
              <p className="text-xs font-semibold text-gray-100 truncate">
                {player.strNationality || '-'}
              </p>
            </div>

            <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-gray-400 text-[11px] mb-1">
                <Calendar size={13} className="text-yellow-400" />
                <span>Lahir / Usia</span>
              </div>
              <p className="text-xs font-semibold text-gray-100 truncate">
                {player.dateBorn
                  ? `${player.dateBorn}${age ? ` (${age} thn)` : ''}`
                  : '-'}
              </p>
            </div>

            <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-gray-400 text-[11px] mb-1">
                <Shield size={13} className="text-yellow-400" />
                <span>Klub Saat Ini</span>
              </div>
              <p className="text-xs font-semibold text-gray-100 truncate">
                {player.strTeam || '-'}
              </p>
            </div>

            <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-gray-400 text-[11px] mb-1">
                <Shirt size={13} className="text-yellow-400" />
                <span>Nomor Punggung</span>
              </div>
              <p className="text-xs font-semibold text-gray-100 truncate">
                {player.strNumber ? `#${player.strNumber}` : '-'}
              </p>
            </div>
          </div>

          {/* Social Links (if any) */}
          {(player.strInstagram || player.strTwitter) && (
            <div className="flex flex-wrap gap-2 pt-1">
              {player.strInstagram && (
                <a
                  href={formatMediaUrl(player.strInstagram)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0a0a0a] hover:bg-[#151515] border border-[#1a1a1a] text-xs font-medium text-gray-300 hover:text-white transition-colors"
                >
                  <InstagramIcon size={13} />
                  <span>Instagram</span>
                  <ExternalLink size={11} className="text-gray-500" />
                </a>
              )}
              {player.strTwitter && (
                <a
                  href={formatMediaUrl(player.strTwitter)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0a0a0a] hover:bg-[#151515] border border-[#1a1a1a] text-xs font-medium text-gray-300 hover:text-white transition-colors"
                >
                  <TwitterIcon size={13} />
                  <span>Twitter / X</span>
                  <ExternalLink size={11} className="text-gray-500" />
                </a>
              )}
            </div>
          )}

          {/* Biography */}
          {player.strDescriptionEN && (
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                Biografi
              </h3>
              <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-3.5 text-xs text-gray-300 leading-relaxed max-h-36 overflow-y-auto whitespace-pre-line">
                {player.strDescriptionEN}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#1a1a1a] bg-[#1a1a1a] flex items-center justify-between gap-3">
          <button
            onClick={() =>
              toggleFavorite({
                idPlayer: player.idPlayer,
                strPlayer: player.strPlayer,
                strTeam: player.strTeam,
                strNationality: player.strNationality,
                strPosition: player.strPosition,
                strThumb: playerImage,
              })
            }
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
              favored
                ? 'bg-yellow-400/15 border-yellow-400/40 text-yellow-400'
                : 'bg-[#151515] border-[#1a1a1a] text-gray-200 hover:text-white hover:bg-[#151515]'
            }`}
          >
            <Star size={14} className={favored ? 'fill-yellow-400' : ''} />
            <span>{favored ? 'Tersimpan di Favorit' : 'Simpan ke Favorit'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#151515] hover:bg-[#151515] border border-[#1a1a1a] text-xs font-semibold text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerDetailModal;

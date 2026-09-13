import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Plus } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { lookupPlayer } from '../lib/api';
import FavoritesEmptyState from '../components/favorites/FavoritesEmptyState';
import FavoritePlayerCard from '../components/favorites/FavoritePlayerCard';
import CustomPlayerModal from '../components/favorites/CustomPlayerModal';
import PlayerDetailModal from '../components/player/PlayerDetailModal';

export function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [customModalOpen, setCustomModalOpen] = useState(false);

  const handleOpenDetail = async (p) => {
    if (p.isCustom) {
      setSelectedPlayer(p);
      setDetailModalOpen(true);
      return;
    }

    setLoadingDetail(true);
    try {
      const full = await lookupPlayer(p.idPlayer);
      setSelectedPlayer(full || p);
    } catch {
      setSelectedPlayer(p);
    } finally {
      setLoadingDetail(false);
      setDetailModalOpen(true);
    }
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white bg-[#151515] hover:bg-[#1a1a1a] border border-[#1a1a1a] px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Kembali ke Pencarian</span>
        </Link>

        {/* Action Button: Tambah Pemain Kustom */}
        <button
          onClick={() => setCustomModalOpen(true)}
          className="inline-flex items-center gap-2 text-xs font-semibold bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded-xl transition-colors shadow-sm cursor-pointer"
        >
          <Plus size={15} />
          <span>Tambah Pemain Sendiri</span>
        </button>
      </div>

      {/* Main Title Banner */}
      <div className="bg-[#151515] border border-[#1a1a1a] rounded-2xl p-6 mb-8">
        <div>
          <h1 className="font-title text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Pemain Favorit
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Koleksi pemain sepak bola pilihan dan skuad impian yang kamu simpan.
          </p>
        </div>
      </div>

      {/* Roster Grid or Empty State */}
      {favorites.length === 0 ? (
        <FavoritesEmptyState onOpenCustomModal={() => setCustomModalOpen(true)} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {favorites.map((player) => (
            <FavoritePlayerCard
              key={player.idPlayer}
              player={player}
              onRemove={removeFavorite}
              onOpenDetail={handleOpenDetail}
              loadingDetail={loadingDetail}
            />
          ))}
        </div>
      )}

      {/* Modal Detail Pop-up */}
      <PlayerDetailModal
        player={selectedPlayer}
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
      />

      {/* Modal Tambah Pemain Kustom */}
      <CustomPlayerModal
        isOpen={customModalOpen}
        onClose={() => setCustomModalOpen(false)}
      />
    </div>
  );
}

export default FavoritesPage;

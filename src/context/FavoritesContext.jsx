import { createContext, useContext, useEffect, useState } from 'react';

const FavoritesContext = createContext(null);
const STORAGE_KEY = 'favoritePlayers';

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Abaikan jika localStorage tidak tersedia
    }
  }, [favorites]);

  const isFavorite = (idPlayer) =>
    favorites.some((f) => f.idPlayer === idPlayer);

  const toggleFavorite = (player) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.idPlayer === player.idPlayer);
      if (exists) {
        return prev.filter((f) => f.idPlayer !== player.idPlayer);
      }
      return [...prev, player];
    });
  };

  const addCustomPlayer = (customPlayer) => {
    const newPlayer = {
      idPlayer: `custom-${Date.now()}`,
      strPlayer: customPlayer.strPlayer.trim(),
      strTeam: (customPlayer.strTeam || '').trim(),
      strNationality: (customPlayer.strNationality || '').trim(),
      strPosition: customPlayer.strPosition || 'Forward',
      strNumber: (customPlayer.strNumber || '').trim(),
      strHeight: (customPlayer.strHeight || '').trim(),
      strWeight: (customPlayer.strWeight || '').trim(),
      dateBorn: (customPlayer.dateBorn || '').trim(),
      strThumb: (customPlayer.strThumb || '').trim(),
      strDescriptionEN: (customPlayer.strDescriptionEN || '').trim(),
      isCustom: true,
      createdAt: new Date().toISOString(),
    };
    setFavorites((prev) => [newPlayer, ...prev]);
    return newPlayer;
  };

  const removeFavorite = (idPlayer) => {
    setFavorites((prev) => prev.filter((f) => f.idPlayer !== idPlayer));
  };

  const value = {
    favorites,
    isFavorite,
    toggleFavorite,
    addCustomPlayer,
    removeFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error('useFavorites harus dipakai di dalam FavoritesProvider');
  }
  return ctx;
}

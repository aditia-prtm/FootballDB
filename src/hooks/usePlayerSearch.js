import { useState, useEffect, useCallback } from 'react';
import { searchPlayers, lookupPlayer } from '../lib/api';
import { DEFAULT_PLAYER } from '../lib/constants';

export function usePlayerSearch() {
  const [player, setPlayer] = useState(DEFAULT_PLAYER);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDefault, setIsDefault] = useState(true);

  // Ambil detail lengkap pemain default (Mudryk) di background
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const results = await searchPlayers('Mudryk');
        const mudryk = results.find((p) =>
          (p.strPlayer || '').toLowerCase().includes('mudryk')
        );

        if (mudryk && !cancelled) {
          const detail = await lookupPlayer(mudryk.idPlayer);
          if (!cancelled && detail) {
            setPlayer(detail);
            setIsDefault(true);
          }
        }
      } catch (err) {
        console.error('Fetch Mudryk detail error:', err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSearch = useCallback(async (searchQuery) => {
    if (!searchQuery?.trim()) return;

    setLoading(true);
    setError('');

    try {
      const results = await searchPlayers(searchQuery);
      if (results && results.length > 0) {
        const first = results[0];
        const detail = await lookupPlayer(first.idPlayer);
        setPlayer(detail || first);
        setIsDefault(false);
      } else {
        setPlayer(null);
        setError(`Tidak ada pemain ditemukan untuk "${searchQuery}".`);
        setIsDefault(false);
      }
    } catch (err) {
      console.error('Search players error:', err);
      setPlayer(null);
      setError('Gagal melakukan pencarian pemain. Silakan periksa koneksi internet Anda.');
      setIsDefault(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setPlayer(DEFAULT_PLAYER);
    setError('');
    setIsDefault(true);
  }, []);

  return {
    player,
    loading,
    error,
    isDefault,
    handleSearch,
    handleReset,
  };
}

export default usePlayerSearch;

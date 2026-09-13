export const BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';

/**
 * Cari pemain sepak bola berdasarkan nama.
 * Hanya mengembalikan hasil dengan strSport === 'Soccer'.
 */
export async function searchPlayers(query) {
  const trimmed = (query || '').trim();
  if (!trimmed) return [];

  const res = await fetch(
    `${BASE_URL}/searchplayers.php?p=${encodeURIComponent(trimmed)}`
  );
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

  const data = await res.json();
  return (data.player || []).filter((p) => p.strSport === 'Soccer');
}

/**
 * Ambil detail lengkap satu pemain berdasarkan idPlayer.
 */
export async function lookupPlayer(id) {
  if (!id) return null;

  const res = await fetch(`${BASE_URL}/lookupplayer.php?id=${id}`);
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

  const data = await res.json();
  return data.players?.[0] || null;
}

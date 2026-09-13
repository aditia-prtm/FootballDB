/**
 * Helper utility functions
 */

/**
 * Menghitung usia berdasarkan tanggal lahir string (YYYY-MM-DD)
 * @param {string} dateString
 * @returns {number|null}
 */
export function calculateAge(dateString) {
  if (!dateString) return null;
  const birth = new Date(dateString);
  if (isNaN(birth.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
    age--;
  }
  return age > 0 ? age : null;
}

/**
 * Normalisasi URL media (menambahkan https jika diperlukan)
 * @param {string} url
 * @returns {string}
 */
export function formatMediaUrl(url) {
  if (!url) return '';
  const trimmed = url.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

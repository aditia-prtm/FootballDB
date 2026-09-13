import { useState } from 'react';
import { X, Plus, ImageIcon, AlertCircle } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';

export function CustomPlayerModal({ isOpen, onClose }) {
  const { addCustomPlayer } = useFavorites();

  const [formData, setFormData] = useState({
    strPlayer: '',
    strTeam: '',
    strPosition: 'Forward',
    strNationality: '',
    strNumber: '',
    dateBorn: '',
    strThumb: '',
    strDescriptionEN: '',
  });

  const [error, setError] = useState('');
  const [imageError, setImageError] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'strThumb') {
      setImageError(false);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.strPlayer.trim()) {
      setError('Nama pemain wajib diisi.');
      return;
    }
    if (!formData.strTeam.trim()) {
      setError('Nama klub / tim wajib diisi.');
      return;
    }

    addCustomPlayer(formData);
    setFormData({
      strPlayer: '',
      strTeam: '',
      strPosition: 'Forward',
      strNationality: '',
      strNumber: '',
      dateBorn: '',
      strThumb: '',
      strDescriptionEN: '',
    });
    setError('');
    setImageError(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#151515] border border-[#1a1a1a] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-[#1a1a1a] flex items-center justify-between bg-[#0a0a0a]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-yellow-500/15 border border-yellow-500/30 flex items-center justify-center text-yellow-400">
              <Plus size={18} />
            </div>
            <div>
              <h2 className="font-title text-base font-bold text-white">
                Tambah Pemain Favorit
              </h2>
              <p className="text-xs text-gray-400">
                Buat profil pemain kustom untuk disimpan ke koleksimu
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#151515] text-gray-400 hover:text-white hover:bg-[#151515] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-xs text-rose-300">
              {error}
            </div>
          )}

          {/* Nama Pemain & Klub */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Nama Pemain <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                name="strPlayer"
                value={formData.strPlayer}
                onChange={handleChange}
                placeholder="Contoh: Cristiano Ronaldo"
                required
                className="w-full bg-[#0a0a0a] border border-[#1a1a1a] focus:border-yellow-500 rounded-xl px-3.5 py-2.5 text-xs text-gray-100 placeholder:text-gray-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Klub / Tim <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                name="strTeam"
                value={formData.strTeam}
                onChange={handleChange}
                placeholder="Contoh: Real Madrid"
                required
                className="w-full bg-[#0a0a0a] border border-[#1a1a1a] focus:border-yellow-500 rounded-xl px-3.5 py-2.5 text-xs text-gray-100 placeholder:text-gray-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Posisi & Nomor Punggung */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Posisi
              </label>
              <select
                name="strPosition"
                value={formData.strPosition}
                onChange={handleChange}
                className="w-full bg-[#0a0a0a] border border-[#1a1a1a] focus:border-yellow-500 rounded-xl px-3.5 py-2.5 text-xs text-gray-100 focus:outline-none cursor-pointer"
              >
                <option value="Forward">Forward / Striker</option>
                <option value="Left Wing">Left Winger</option>
                <option value="Right Wing">Right Winger</option>
                <option value="Attacking Midfield">Attacking Midfield (CAM)</option>
                <option value="Central Midfield">Central Midfield (CM)</option>
                <option value="Defensive Midfield">Defensive Midfield (CDM)</option>
                <option value="Centre-Back">Centre-Back (CB)</option>
                <option value="Full-Back">Full-Back / Wing-Back</option>
                <option value="Goalkeeper">Goalkeeper (GK)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Nomor Punggung
              </label>
              <input
                type="text"
                name="strNumber"
                value={formData.strNumber}
                onChange={handleChange}
                placeholder="Contoh: 7 atau 10"
                className="w-full bg-[#0a0a0a] border border-[#1a1a1a] focus:border-yellow-500 rounded-xl px-3.5 py-2.5 text-xs text-gray-100 placeholder:text-gray-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Kebangsaan & Tanggal Lahir */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Kebangsaan
              </label>
              <input
                type="text"
                name="strNationality"
                value={formData.strNationality}
                onChange={handleChange}
                placeholder="Contoh: Portugal, Indonesia"
                className="w-full bg-[#0a0a0a] border border-[#1a1a1a] focus:border-yellow-500 rounded-xl px-3.5 py-2.5 text-xs text-gray-100 placeholder:text-gray-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Tanggal Lahir
              </label>
              <input
                type="date"
                name="dateBorn"
                value={formData.dateBorn}
                onChange={handleChange}
                className="w-full bg-[#0a0a0a] border border-[#1a1a1a] focus:border-yellow-500 rounded-xl px-3.5 py-2.5 text-xs text-gray-100 focus:outline-none"
              />
            </div>
          </div>

          {/* URL Foto Pemain with Preview & Helper */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              URL Langsung File Foto / Gambar (Opsional)
            </label>
            <input
              type="url"
              name="strThumb"
              value={formData.strThumb}
              onChange={handleChange}
              placeholder="https://example.com/foto-pemain.png (akhiran .jpg, .png, .webp)"
              className="w-full bg-[#0a0a0a] border border-[#1a1a1a] focus:border-yellow-500 rounded-xl px-3.5 py-2.5 text-xs text-gray-100 placeholder:text-gray-500 focus:outline-none"
            />
            <p className="text-[11px] text-gray-500 mt-1">
              *Tips: Gunakan link langsung file gambar (*Direct Image URL*). Jangan gunakan link halaman web / artikel.
            </p>

            {/* Live Preview if URL provided */}
            {formData.strThumb.trim() && (
              <div className="mt-2.5 p-3 rounded-xl bg-[#0a0a0a] border border-[#1a1a1a] flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[#151515] border border-[#1a1a1a] flex items-center justify-center overflow-hidden flex-shrink-0">
                  {!imageError ? (
                    <img
                      src={formData.strThumb}
                      alt="Preview"
                      className="w-full h-full object-contain"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <ImageIcon size={18} className="text-gray-500" />
                  )}
                </div>
                <div className="text-xs">
                  {!imageError ? (
                    <span className="text-green-400 font-medium flex items-center gap-1">
                      ✓ Gambar berhasil dimuat
                    </span>
                  ) : (
                    <span className="text-rose-400 font-medium flex items-center gap-1">
                      <AlertCircle size={13} /> URL bukan file gambar langsung atau tidak dapat diakses
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Biografi / Catatan */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Catatan / Biografi Singkat
            </label>
            <textarea
              name="strDescriptionEN"
              rows={3}
              value={formData.strDescriptionEN}
              onChange={handleChange}
              placeholder="Tuliskan catatan atau profil singkat tentang pemain ini..."
              className="w-full bg-[#0a0a0a] border border-[#1a1a1a] focus:border-yellow-500 rounded-xl p-3 text-xs text-gray-100 placeholder:text-gray-500 focus:outline-none resize-none"
            />
          </div>

          {/* Footer Submit */}
          <div className="pt-3 border-t border-[#1a1a1a] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#151515] hover:bg-[#151515] border border-[#1a1a1a] text-xs font-semibold text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-yellow-600 hover:bg-yellow-500 text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer flex items-center gap-1.5"
            >
              <Plus size={15} />
              Simpan ke Favorit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomPlayerModal;

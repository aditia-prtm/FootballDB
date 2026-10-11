import { useEffect } from 'react';
import { X, Plus, ImageIcon, AlertCircle } from 'lucide-react';
import { useCustomPlayerForm } from '../../hooks/useCustomPlayerForm';

export function CustomPlayerModal({ isOpen, onClose }) {
  // Menggunakan React Hook Form + Zod Validation via custom hook
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    resetForm,
    setFocus,
    strThumbValue,
    imageError,
    setImageError,
  } = useCustomPlayerForm(() => {
    onClose();
  });

  // Auto-focus ke input nama pemain saat modal dibuka
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setFocus('strPlayer');
      }, 50);
      return () => clearTimeout(timer);
    } else {
      resetForm();
    }
  }, [isOpen, setFocus, resetForm]);

  if (!isOpen) return null;

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#151515] border border-[#1a1a1a] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-[#1a1a1a] flex items-center justify-between bg-[#0a0a0a]">
          <div className="flex items-center gap-2.5">
            <div>
              <h2 className="font-title text-base font-bold text-white">
                Tambah Pemain Favorit
              </h2>
              <p className="text-xs text-gray-400">
                Profil pemain kustom tervalidasi dengan React Hook Form + Zod
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 rounded-lg bg-[#151515] text-gray-400 hover:text-white hover:bg-[#1a1a1a] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Nama Pemain & Klub */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Nama Pemain <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: Cristiano Ronaldo"
                {...register('strPlayer')}
                className={`w-full bg-[#0a0a0a] border rounded-xl px-3.5 py-2.5 text-xs text-gray-100 placeholder:text-gray-500 focus:outline-none transition-colors ${
                  errors.strPlayer
                    ? 'border-rose-500/80 focus:border-rose-500'
                    : 'border-[#1a1a1a] focus:border-yellow-500'
                }`}
              />
              {errors.strPlayer && (
                <p className="text-[11px] text-rose-400 mt-1.5 flex items-center gap-1 font-medium">
                  <AlertCircle size={12} />
                  <span>{errors.strPlayer.message}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Klub / Tim <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: Real Madrid"
                {...register('strTeam')}
                className={`w-full bg-[#0a0a0a] border rounded-xl px-3.5 py-2.5 text-xs text-gray-100 placeholder:text-gray-500 focus:outline-none transition-colors ${
                  errors.strTeam
                    ? 'border-rose-500/80 focus:border-rose-500'
                    : 'border-[#1a1a1a] focus:border-yellow-500'
                }`}
              />
              {errors.strTeam && (
                <p className="text-[11px] text-rose-400 mt-1.5 flex items-center gap-1 font-medium">
                  <AlertCircle size={12} />
                  <span>{errors.strTeam.message}</span>
                </p>
              )}
            </div>
          </div>

          {/* Posisi & Nomor Punggung */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Posisi
              </label>
              <select
                {...register('strPosition')}
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
                placeholder="Contoh: 7 atau 10"
                {...register('strNumber')}
                className={`w-full bg-[#0a0a0a] border rounded-xl px-3.5 py-2.5 text-xs text-gray-100 placeholder:text-gray-500 focus:outline-none transition-colors ${
                  errors.strNumber
                    ? 'border-rose-500/80 focus:border-rose-500'
                    : 'border-[#1a1a1a] focus:border-yellow-500'
                }`}
              />
              {errors.strNumber && (
                <p className="text-[11px] text-rose-400 mt-1.5 flex items-center gap-1 font-medium">
                  <AlertCircle size={12} />
                  <span>{errors.strNumber.message}</span>
                </p>
              )}
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
                placeholder="Contoh: Portugal, Indonesia"
                {...register('strNationality')}
                className={`w-full bg-[#0a0a0a] border rounded-xl px-3.5 py-2.5 text-xs text-gray-100 placeholder:text-gray-500 focus:outline-none transition-colors ${
                  errors.strNationality
                    ? 'border-rose-500/80 focus:border-rose-500'
                    : 'border-[#1a1a1a] focus:border-yellow-500'
                }`}
              />
              {errors.strNationality && (
                <p className="text-[11px] text-rose-400 mt-1.5 flex items-center gap-1 font-medium">
                  <AlertCircle size={12} />
                  <span>{errors.strNationality.message}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Tanggal Lahir
              </label>
              <input
                type="date"
                {...register('dateBorn')}
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
              type="text"
              placeholder="https://example.com/foto-pemain.png (akhiran .jpg, .png, .webp)"
              {...register('strThumb')}
              className={`w-full bg-[#0a0a0a] border rounded-xl px-3.5 py-2.5 text-xs text-gray-100 placeholder:text-gray-500 focus:outline-none transition-colors ${
                errors.strThumb
                  ? 'border-rose-500/80 focus:border-rose-500'
                  : 'border-[#1a1a1a] focus:border-yellow-500'
              }`}
            />
            {errors.strThumb && (
              <p className="text-[11px] text-rose-400 mt-1.5 flex items-center gap-1 font-medium">
                <AlertCircle size={12} />
                <span>{errors.strThumb.message}</span>
              </p>
            )}
            <p className="text-[11px] text-gray-500 mt-1">
              *Tips: Gunakan link langsung file gambar (*Direct Image URL*). Jangan gunakan link halaman web / artikel.
            </p>

            {/* Live Preview if URL provided */}
            {strThumbValue.trim() && (
              <div className="mt-2.5 p-3 rounded-xl bg-[#0a0a0a] border border-[#1a1a1a] flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[#151515] border border-[#1a1a1a] flex items-center justify-center overflow-hidden flex-shrink-0">
                  {!imageError ? (
                    <img
                      src={strThumbValue}
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
              rows={3}
              placeholder="Tuliskan catatan atau profil singkat tentang pemain ini..."
              {...register('strDescriptionEN')}
              className={`w-full bg-[#0a0a0a] border rounded-xl p-3 text-xs text-gray-100 placeholder:text-gray-500 focus:outline-none resize-none transition-colors ${
                errors.strDescriptionEN
                  ? 'border-rose-500/80 focus:border-rose-500'
                  : 'border-[#1a1a1a] focus:border-yellow-500'
              }`}
            />
            {errors.strDescriptionEN && (
              <p className="text-[11px] text-rose-400 mt-1.5 flex items-center gap-1 font-medium">
                <AlertCircle size={12} />
                <span>{errors.strDescriptionEN.message}</span>
              </p>
            )}
          </div>

          {/* Footer Submit */}
          <div className="pt-3 border-t border-[#1a1a1a] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 rounded-xl bg-[#151515] hover:bg-[#1a1a1a] border border-[#1a1a1a] text-xs font-semibold text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-yellow-600 hover:bg-yellow-500 disabled:opacity-50 text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer flex items-center gap-1.5"
            >
              <Plus size={15} />
              {isSubmitting ? 'Menyimpan...' : 'Simpan ke Favorit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomPlayerModal;

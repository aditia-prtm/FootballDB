import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFavorites } from '../context/FavoritesContext';
import { customPlayerSchema, defaultPlayerValues } from '../lib/playerSchema';

/**
 * Custom React Hook yang menggabungkan react-hook-form + Zod validation
 * untuk menangani form penambahan pemain kustom di halaman favorit.
 *
 * @param {Function} onSuccess - Callback yang dipanggil saat submit berhasil (misal: menutup modal)
 */
export function useCustomPlayerForm(onSuccess) {
  const { addCustomPlayer } = useFavorites();
  const [imageError, setImageError] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(customPlayerSchema),
    defaultValues: defaultPlayerValues,
    mode: 'onTouched',
  });

  // Watch strThumb untuk live image preview
  const strThumbValue = watch('strThumb') || '';

  // Reset status image error saat URL foto diubah
  useEffect(() => {
    setImageError(false);
  }, [strThumbValue]);

  // Handler saat form valid dan di-submit
  const onValidSubmit = useCallback(
    (data) => {
      addCustomPlayer(data);
      reset(defaultPlayerValues);
      setImageError(false);

      if (typeof onSuccess === 'function') {
        onSuccess();
      }
    },
    [addCustomPlayer, reset, onSuccess]
  );

  const resetForm = useCallback(() => {
    reset(defaultPlayerValues);
    setImageError(false);
  }, [reset]);

  return {
    register,
    handleSubmit: handleSubmit(onValidSubmit),
    errors,
    isSubmitting,
    resetForm,
    setFocus,
    strThumbValue,
    imageError,
    setImageError,
  };
}

export default useCustomPlayerForm;

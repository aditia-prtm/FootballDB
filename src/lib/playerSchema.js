import { z } from 'zod';

export const customPlayerSchema = z.object({
  strPlayer: z
    .string()
    .trim()
    .min(1, 'Nama pemain wajib diisi.')
    .min(2, 'Nama pemain minimal 2 karakter.')
    .max(50, 'Nama pemain maksimal 50 karakter.'),
  strTeam: z
    .string()
    .trim()
    .min(1, 'Nama klub / tim wajib diisi.')
    .max(50, 'Nama klub / tim maksimal 50 karakter.'),
  strPosition: z.string().default('Forward'),
  strNumber: z
    .string()
    .trim()
    .max(4, 'Nomor punggung maksimal 4 karakter.')
    .optional()
    .or(z.literal('')),
  strNationality: z
    .string()
    .trim()
    .max(50, 'Kebangsaan maksimal 50 karakter.')
    .optional()
    .or(z.literal('')),
  dateBorn: z
    .string()
    .optional()
    .or(z.literal('')),
  strThumb: z
    .string()
    .trim()
    .refine(
      (val) => !val || /^https?:\/\/.+/i.test(val),
      'URL gambar harus diawali dengan http:// atau https://'
    )
    .optional()
    .or(z.literal('')),
  strDescriptionEN: z
    .string()
    .trim()
    .max(600, 'Deskripsi maksimal 600 karakter.')
    .optional()
    .or(z.literal('')),
});

export const defaultPlayerValues = {
  strPlayer: '',
  strTeam: '',
  strPosition: 'Forward',
  strNumber: '',
  strNationality: '',
  dateBorn: '',
  strThumb: '',
  strDescriptionEN: '',
};

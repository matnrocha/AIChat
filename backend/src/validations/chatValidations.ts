import { z } from 'zod';

export const updateSessionTitleSchema = z.object({
  params: z.object({
    id: z.string().min(1, "ID da sessão é obrigatório"),
  }),
  body: z.object({
    title: z.string()
      .min(1, "O título não pode estar vazio")
      .max(100, "O título não pode ter mais de 100 caracteres"),
  }),
});

export type UpdateSessionTitleInput = z.infer<typeof updateSessionTitleSchema>;
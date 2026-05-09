import { z } from 'zod';

const estadoSchema = z.enum(['activo', 'inactivo']);

export const createProductSchema = z.object({
  nombre: z.string().trim().min(1).max(120),
  descripcion: z.string().trim().min(1).max(500),
  cantidad: z.int().min(0),
  estado: estadoSchema,
  fotoUrl: z.url().max(2048)
});

export const updateProductSchema = createProductSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: 'Debes enviar al menos un campo para actualizar.' }
);

export const productNameQuerySchema = z.object({
  nombre: z.string().trim().min(1)
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;

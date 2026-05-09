import type { Request, Response } from 'express';
import { ZodError } from 'zod';
import { productRepository } from './product.repository.js';
import {
  createProductSchema,
  productNameQuerySchema,
  updateProductSchema
} from './product.schemas.js';

const parseId = (value: string | string[] | undefined): number | null => {
  if (typeof value !== 'string') {
    return null;
  }
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
};

const sendValidationError = (res: Response, error: ZodError): Response =>
  res.status(400).json({
    message: 'Datos de entrada no validos.',
    errors: error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message
    }))
  });

export const productController = {
  async getAll(_req: Request, res: Response): Promise<Response> {
    const products = await productRepository.findAll();
    return res.status(200).json(products);
  },

  async getById(req: Request, res: Response): Promise<Response> {
    const id = parseId(req.params.id);
    if (!id) {
      return res.status(400).json({ message: 'El id debe ser un entero positivo.' });
    }

    const product = await productRepository.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }

    return res.status(200).json(product);
  },

  async getByName(req: Request, res: Response): Promise<Response> {
    try {
      const { nombre } = productNameQuerySchema.parse(req.query);
      const products = await productRepository.findByName(nombre);
      return res.status(200).json(products);
    } catch (error) {
      if (error instanceof ZodError) {
        return sendValidationError(res, error);
      }
      throw error;
    }
  },

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = createProductSchema.parse(req.body);
      const created = await productRepository.create(data);
      return res.status(201).json(created);
    } catch (error) {
      if (error instanceof ZodError) {
        return sendValidationError(res, error);
      }
      throw error;
    }
  },

  async update(req: Request, res: Response): Promise<Response> {
    const id = parseId(req.params.id);
    if (!id) {
      return res.status(400).json({ message: 'El id debe ser un entero positivo.' });
    }

    try {
      const data = updateProductSchema.parse(req.body);
      const updated = await productRepository.update(id, data);

      if (!updated) {
        return res.status(404).json({ message: 'Producto no encontrado.' });
      }

      return res.status(200).json(updated);
    } catch (error) {
      if (error instanceof ZodError) {
        return sendValidationError(res, error);
      }
      throw error;
    }
  },

  async remove(req: Request, res: Response): Promise<Response> {
    const id = parseId(req.params.id);
    if (!id) {
      return res.status(400).json({ message: 'El id debe ser un entero positivo.' });
    }

    const deleted = await productRepository.remove(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }

    return res.status(204).send();
  }
};

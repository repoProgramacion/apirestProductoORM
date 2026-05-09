import type { NextFunction, Request, Response } from 'express';

type MysqlError = Error & {
  code?: string;
  errno?: number;
};

export const errorHandler = (
  error: MysqlError,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response => {
  if (error.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ message: 'Ya existe un producto con ese nombre.' });
  }

  if (error.code?.startsWith('ER_') || error.code === 'ECONNREFUSED') {
    return res.status(503).json({ message: 'Error de base de datos.' });
  }

  return res.status(500).json({ message: 'Error interno del servidor.' });
};

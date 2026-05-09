import express from 'express';
import { errorHandler } from './middleware/error-handler.js';
import { productRouter } from './modules/products/product.routes.js';

export const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/productos', productRouter);

app.use((_req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada.' });
});

app.use(errorHandler);

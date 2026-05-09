import test from 'node:test';
import assert from 'node:assert/strict';
import { app } from './app.js';

test('GET /health responde 200', async () => {
  const server = app.listen(0);

  try {
    const address = server.address();
    if (!address || typeof address === 'string') {
      throw new Error('No se pudo obtener el puerto de pruebas.');
    }

    const response = await fetch(`http://127.0.0.1:${address.port}/health`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(body, { status: 'ok' });
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  }
});

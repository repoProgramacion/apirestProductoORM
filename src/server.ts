import { app } from './app.js';
import { env } from './config/env.js';

app.listen(env.port, () => {
  process.stdout.write(`API ejecutandose en http://localhost:${env.port}\n`);
});

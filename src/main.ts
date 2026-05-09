import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );

  app.getHttpAdapter().get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port);
  process.stdout.write(`API ejecutandose en http://localhost:${port}\n`);
}

void bootstrap();

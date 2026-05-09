import 'dotenv/config';

const toNumber = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const env = {
  port: toNumber(process.env.PORT, 3000),
  dbHost: process.env.DB_HOST ?? 'localhost',
  dbPort: toNumber(process.env.DB_PORT, 3306),
  dbUser: process.env.DB_USER ?? 'root',
  dbPassword: process.env.DB_PASSWORD ?? '',
  dbName: process.env.DB_NAME ?? 'productos_db'
};

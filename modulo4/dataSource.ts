import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from "dotenv";

const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env.development';
dotenvConfig({ path: envFile });

const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,   // 👈 para test está bien
  dropSchema: true,    // 👈 esto limpia la BD en cada test run
  logging: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
};

export default new DataSource(config);

import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { type Request, type Response } from 'express';
import { AppModule } from '../src/app.module.js';

let cachedApp: express.Express | null = null;

async function bootstrap() {
  if (!cachedApp) {
    const expressApp = express();
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    app.enableCors({ origin: process.env.FRONTEND_URL });
    await app.init();
    cachedApp = expressApp;
  }
  return cachedApp;
}

export default async (req: Request, res: Response) => {
  const app = await bootstrap();
  app(req, res);
};
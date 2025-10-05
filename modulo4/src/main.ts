import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { AuthGuard } from './auth/auth.guard';
import { DateAdderInterceptor } from './interceptors/date-adder.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalGuards(new AuthGuard);
  // app.useGlobalInterceptors(new DateAdderInterceptor);
  app.useGlobalPipes(new ValidationPipe);
  app.use(new LoggerMiddleware().use);

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Documentación dinámica de la API con Swagger')
    .setVersion('1.0')
    .addBearerAuth() // 👈 Para JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // mantiene el token en el Try it Out
    },
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

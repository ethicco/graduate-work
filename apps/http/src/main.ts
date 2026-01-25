import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  INestApplication,
  Logger,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

const initializeSwaggerDocumentation = (
  app: INestApplication,
  swaggerPath: string,
): void => {
  const config = new DocumentBuilder()
    .setTitle(`REST API Документация сервиса aggregator booking hotels`)
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerPath, app, document);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const configService = app.get(ConfigService);

  const port = configService.get<number>('HTTP_API_PORT', 3000);
  const swaggerPath = '/swagger-ui'
  const logger = new Logger('application');

  app.setGlobalPrefix('/api');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  initializeSwaggerDocumentation(app, swaggerPath);

  await app.listen(port);
  const url = await app.getUrl();

  logger.log(`Swagger is running on: ${url}${swaggerPath}`);
  logger.log(`HTTP API server is running on: ${port} port`);
}
bootstrap();

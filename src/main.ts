import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(compression());

  const config = new DocumentBuilder()
    .setTitle('7180 petshop-API')
    .setDescription('API do curso 7180 do balta.io')
    .setVersion('1.0')
    .addTag('petshop', 'api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);
  
  await app.listen(3000);
}
bootstrap();

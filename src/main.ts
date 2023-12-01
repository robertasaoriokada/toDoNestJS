import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // configuracao do cors  
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3333);
}
bootstrap();

//preciso adicionar DTO
//validação das informações
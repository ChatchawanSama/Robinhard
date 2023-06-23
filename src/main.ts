import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Sequelize } from 'sequelize-typescript';
import { User } from './users/user.model';
import { WrapExceptionFilter } from './exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new WrapExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Robinhard API')
    .setDescription('The Robinhard API description')
    .setVersion('1.0')
    // .addTag('cats') 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);
  
   await app.listen(3000);
   
}
bootstrap();
 
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Sequelize } from 'sequelize-typescript';
import { User } from './users/user.model';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Robinhard API')
    .setDescription('The Robinhard API description')
    .setVersion('1.0')
    // .addTag('cats') 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);
  
  // const sequelize = new Sequelize({
  //   dialect: 'mysql',
  //   host: process.env.DB_HOST,
  //   port: +process.env.DB_PORT,
  //   username: process.env.DB_USERNAME,
  //   password: process.env.DB_PASSWORD,
  //   database: process.env.DB_DATABASE,
  // });

  // sequelize.addModels([User]);

  // await sequelize.sync();
  
   await app.listen(3000);
   
}
bootstrap();
 
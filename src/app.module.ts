import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sequelize } from 'sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/user.model';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

require('dotenv').config(); // Import and configure dotenv

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadModels: true,
      synchronize: true,
      models: [User]
    }),
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
}) 
export class AppModule {}
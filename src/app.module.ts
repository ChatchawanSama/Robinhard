import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sequelize } from 'sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/user.model';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'keep1234',
      database: 'keeplearning',
      autoLoadModels: true,
      synchronize: true,
      models: [User]
    }),
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
}) 
export class AppModule {}

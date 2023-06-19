import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { SequelizeModule } from "@nestjs/sequelize";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { JwtAuthGuard, JwtStrategy } from "./auth/jwt-auth.guard";
import { User } from "./users/user.model";
import { UsersController } from "./users/users.controller";
import { UsersModule } from "./users/users.module";
import { UsersService } from "./users/users.service";


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
      models: [User],
      autoLoadModels: true,
      synchronize: true,
    }),
    // UsersModule
    SequelizeModule.forFeature([User]),
    
    JwtModule.register({
      secret: 'fusic-secretkey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService, JwtAuthGuard, JwtStrategy],
}) 
export class AppModule {}
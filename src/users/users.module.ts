import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AppModule } from "src/app.module";
import { User } from "./user.model";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
    imports: [
        SequelizeModule.forFeature([User]),     
    ],
    controllers:[UsersController],
    providers: [UsersService],
    exports: [SequelizeModule]
})
export class UsersModule {}
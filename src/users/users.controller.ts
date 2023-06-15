import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './CreateUser.dto';
import { User } from './user.model';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}
    @Get()
    findAll(): Promise<User[]>{
        return this.userService.findAll()
    }
    @Get(':id')
    @ApiParam({ name: 'id'})
    findOne(@Param() params): Promise<User>{
        return this.userService.findOne(params.id)
    }
    // @Post('create')
    // createUser(@Body() user : User){
    //     // user.id++;
    //     this.userService.createUser(user);
    // }
    @Post('/create')
    async create(@Body() createUserDto: User): Promise<User> {
        const user = new User();
        user.name = createUserDto.name;
        user.email = createUserDto.email;

        return this.userService.saveData(user);
    }
   

    @Put(':id')
    update(@Param() params, @Body() user: User):Promise<User>{
        return this.userService.update(params.id,user)
    }
    @Delete(':id')
    destroy(@Param() params):Promise<User>{
        return this.userService.destroy(params.id)
    }
}
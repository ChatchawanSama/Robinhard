import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './CreateUser.dto';
import { UpdateUserDto } from './UpdateUser.dto';
import { User } from './user.model';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}
    
    @Get()
    async getAllData(): Promise<User[]> {
        return this.userService.getAllData();
    }

    @Get(':id')
    async getDataById(@Param('id') id: number): Promise<User> {
      return this.userService.getDataById(id);
    }
   
    @Post('/create')
    create(@Body() createUserDto: User): Promise<User> {
        const user = new User();
        user.name = createUserDto.name;
        user.email = createUserDto.email;
        
        return this.userService.saveData(user);
    }

    @Put(':id')
    async updateData(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    async deleteData(@Param('id') id: number) {
      return this.userService.deleteData(id);
    }
  
}
import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { ApiParam, ApiTags } from '@nestjs/swagger';
// import { CreateUserDto } from './CreateUser.dto'; 
import { UpdateUserDto } from './UpdateUser.dto';
import { User } from './user.model';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './CreateUser.dto';
import { WrapExceptionFilter } from '../exception.filter';

@ApiTags('users')
@Controller('users')
@UseFilters(WrapExceptionFilter)
export class UsersController {
    constructor(private userService: UsersService) {}
    
    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllData(): Promise<User[]> {
        return this.userService.getAllData();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getDataById(@Param('id') id: number): Promise<User> {
      return this.userService.getDataById(id);
    }
   
    // @Post('/create')
    // @UseGuards(JwtAuthGuard)
    // create(@Body() createUserDto: User): Promise<User> {
    //     const user = new User();
    //     user.name = createUserDto.name;
    //     user.email = createUserDto.email;
        
    //     return this.userService.saveData(user);
    // }
    @Post('/create')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe()) // Apply the ValidationPipe
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
      const user = new User();
      user.name = createUserDto.name;
      user.email = createUserDto.email;
      
      return this.userService.saveData(user);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async updateData(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteData(@Param('id') id: number) {
      return this.userService.deleteData(id);
    }
  
}
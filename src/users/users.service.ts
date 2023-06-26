import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'sequelize-typescript';
import { UpdateUserDto } from './UpdateUser.dto';
import { User } from './entities/user.entity';
import { ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './CreateUser.dto';
import { MyCustomException } from '../my-custom.exception';
import { UserCreateRequest } from './models/requests/user-create.request';
import { UserCreateResponse } from './models/responses/user-create.response';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  private users: User[] = [];

  async getAllData(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async getDataById(id: number): Promise<User> {
    return this.userModel.findByPk(id);
  }  

  async saveData(request: UserCreateRequest): Promise<UserCreateResponse> {
    // Create a new instance of the User model and assign the values from the data object
    const user = new User({ 
      name: request.name, email: request.email
    });
    // user.name = request.name;
    // user.email = request.email;
    
    // Save the new user record to the database
    const createUser = await user.save();
    
    return {
      id: createUser.id,
      name: createUser.name,
      email: createUser.email
    };
  }
  

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const data = await this.userModel.findByPk(id);
    if (!data) {
      throw new Error('Data not found');
    }

    // Update the fields with the values from the updateDataDto
    data.name = updateUserDto.name;
    data.email = updateUserDto.email;

    await data.save(); // Save the updated data to the database

    return data;
  }

  // async deleteData(id: number) {
  //   const data = await this.userModel.findByPk(id);
  //   if (!data) {
  //     throw new Error('Data not found');
  //   }

  //   await data.destroy(); // Delete the data from the database

  //   return { message: 'Data deleted successfully' };
  // }

  async deleteData(id: number) {
    const data = await this.userModel.findByPk(id);
    if (!data) {
      throw new MyCustomException('Data not found na ja', HttpStatus.NOT_FOUND);
    }
  
    await data.destroy(); // Delete the data from the database
  
    return { message: 'Data deleted successfully' };
  }
  
}
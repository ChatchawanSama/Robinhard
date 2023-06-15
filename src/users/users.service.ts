import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'sequelize-typescript';
import { User } from './user.model';

@Injectable()
export class UsersService {
  private users: User[] = [];
    userModel: any;

  findAll(): Promise<User[]> {
    return Promise.resolve(this.users);
  }

  findOne(id: number): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    return Promise.resolve(user);
  }

  createUser(user: User){
    this.users.push(user);
  }

  async update(id: number, newUser: User): Promise<User> {
    await this.userModel.update(newUser, {
        where: {
            id,
        },
    });
    const user = this.findOne(id);
    return user;
  }

  
  async destroy(id: number): Promise<User> {
    const user = this.findOne(id);
    this.userModel.destroy({
        where: {
            id,
        },
    });
    return user;
  }
 
}

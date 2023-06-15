import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'sequelize-typescript';
import { User } from './user.model';

@Injectable()
export class UsersService {
  // constructor(
  //   @InjectRepository(User)
  //   private readonly userRepository: Repository<User>,
  // ) {}

  constructor(@InjectModel(User) private userModel: typeof User) {}

  private users: User[] = [];
    // userModel: any;

  findAll(): Promise<User[]> {
    return Promise.resolve(this.users);
  }

  findOne(id: number): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    return Promise.resolve(user);
  }

  // createUser(user: User){
  //   this.users.push(user);
  // }
  // async saveData(data: User): Promise<User> {
  //   // console.log(data.name)
  //   this.users.push(data);
  //   return this.userModel.create(data);
  // }
  async saveData(data: User): Promise<User> {
    this.users.push(data); // Assuming this is for an in-memory storage or additional data manipulation
    
    // Create a new instance of the User model and assign the values from the data object
    const newUser = new User();
    newUser.name = data.name;
    newUser.email = data.email;
    
    // Save the new user record to the database
    await newUser.save();
    
    return newUser; // Return the newly saved user object
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
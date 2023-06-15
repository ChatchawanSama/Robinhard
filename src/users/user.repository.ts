// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from './user.model';

// @Injectable()
// export class UserRepository {
//   constructor(
//     @InjectRepository(User)
//     private userRepository: Repository<User>,
//   ) {}

//   async createUser(userData: any): Promise<User> {
//     const newUser = this.userRepository.create(userData);
//     return await this.userRepository.save(newUser);
//   }
// }

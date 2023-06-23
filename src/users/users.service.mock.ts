// import { UserMock } from './user.mock';
// import { CreateUserDto } from './CreateUser.dto';

// export class UserServiceMock {
//   private users: UserMock[] = [];
//   private nextUserId: number = 1;

//   async getAllData(): Promise<UserMock[]> {
//     return this.users;
//   }

//   async getDataById(id: number): Promise<UserMock> {
//     const user = this.users.find((u) => u.id === id);
//     if (!user) {
//       throw new Error('User not found');
//     }
//     return user;
//   }

//   async saveData(data: CreateUserDto): Promise<UserMock> {
//     const newUser: UserMock = {
//       id: this.nextUserId++,
//       name: data.name,
//       email: data.email,
//     };
//     this.users.push(newUser);
//     return newUser;
//   }

//   async deleteData(id: number): Promise<void> {
//     const index = this.users.findIndex((u) => u.id === id);
//     if (index === -1) {
//       throw new Error('User not found');
//     }
//     this.users.splice(index, 1);
//   }
// }

import { User } from './entities/user.entity';

export class UserMock extends User {
  // Additional properties or methods can be added here
  
  constructor(data: Partial<User>) {
    super();
    Object.assign(this, data);
  }
}

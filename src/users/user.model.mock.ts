import { User } from './user.model';

export class UserMock extends User {
  // Additional properties or methods can be added here
  
  constructor(data: Partial<User>) {
    super();
    Object.assign(this, data);
  }
}

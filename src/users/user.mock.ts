import { User } from './entities/user.entity';

export class UserMock extends User {
    id: number;
    name: string;
    email: string;
}

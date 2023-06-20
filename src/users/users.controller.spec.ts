import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.model';
import { UpdateUserDto } from './UpdateUser.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersModule } from './users.module';
import { CreateUserDto } from './CreateUser.dto';
import { AppModule } from '../app.module';


describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, JwtAuthGuard], // Include JwtAuthGuard in providers
      imports: [ AppModule ,UsersModule, User, CreateUserDto, UpdateUserDto], // Import the module containing UserRepository

    }).compile();
  
    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });
  

  describe('getAllData', () => {
    it('should return an array of users', async () => {
      const users: User[] = [
        new User({ id: 1, name: 'John', email: 'john@example.com' }),
        new User({ id: 2, name: 'Jane', email: 'jane@example.com' }),
      ];
      //mock the behavior of the method. In this case, we mock the resolved value of the method to be the users array.
      jest.spyOn(service, 'getAllData').mockResolvedValue(users);

      const result = await controller.getAllData();

      // console.log(result);
      // console.log(users);

      expect(result).toEqual(users);
    });
  });

  describe('getDataById', () => {
    it('should return a user with the given id', async () => {
      const userId = 1;
      const user: User = new User({ id: userId, name: 'John', email: 'john@example.com' });
      jest.spyOn(service, 'getDataById').mockResolvedValue(user);

      const result = await controller.getDataById(userId);

      expect(result).toEqual(user);
    });
  });

  // // Add test cases for other methods (create, updateData, deleteData) in a similar manner

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: User = new User({ name: 'John', email: 'john@example.com' });
      const createdUser: User = new User({ id: 1, name: 'John', email: 'john@example.com' });
      jest.spyOn(service, 'saveData').mockResolvedValue(createdUser);

      const result = await controller.create(createUserDto);

      expect(result).toEqual(createdUser);
    });
  });

  describe('updateData', () => {
    it('should update a user with the given id', async () => {
      const userId = 1;
      const updateUserDto: UpdateUserDto = { name: 'Updated Name', email: 'updated@example.com' };
      const updatedUser: User = new User({ id: userId, name: 'Updated Name', email: 'updated@example.com' });
      jest.spyOn(service, 'updateUser').mockResolvedValue(updatedUser);

      const result = await controller.updateData(userId, updateUserDto);

      expect(result).toEqual(updatedUser);
    });
  });

  describe('deleteData', () => {
    it('should delete a user with the given id', async () => {
      const userId = 1;
      jest.spyOn(service, 'deleteData').mockResolvedValue(undefined);

      const result = await controller.deleteData(userId);

      expect(result).toBeUndefined();
    });
  });

});

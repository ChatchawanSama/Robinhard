import { getModelToken } from '@nestjs/sequelize';
import { Test } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { User } from '../entities/user.entity';
// import { UserMock } from './user.mock'

// Mock User class
class UserMock {
  public id: number;
  public name: string;
  public email: string;

  public save(): Promise<UserMock> {
    return Promise.resolve(this);
  }
}

describe('UsersController', () => {
    let usersController: UsersController;
    let usersService: UsersService;
  
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        controllers: [UsersController],
        providers: [
          {
            provide: UsersService,
            useValue: {
              getAllData: jest.fn(),
              getDataById: jest.fn(),
              saveData: jest.fn(),
              deleteData: jest.fn(),
            },
          },
          {
            provide: User,
            useValue: {
              findAll: jest.fn(),
              findByPk: jest.fn(),
              save: jest.fn(),
              destroy: jest.fn(),
            },
          },
          {
            provide: User,
            useValue: UserMock, // Use the UserMock class as the mock value
          },
        ],
      }).compile();
  
      usersController = moduleRef.get<UsersController>(UsersController);
      usersService = moduleRef.get<UsersService>(UsersService);
    });
  
    describe('getAllData', () => {
      it('should return an array of users', async () => {
        const users = [
          { id: 1, name: 'John', email: 'john@example.com' },
          { id: 2, name: 'Jane', email: 'jane@example.com' },
        ];
  
        jest.spyOn(usersService, 'getAllData').mockResolvedValue(users as any);
  
        const result = await usersController.getAllData();
  
        expect(result).toEqual(users);
      });
    });
  
    describe('getDataById', () => {
      it('should return the user with the given ID', async () => {
        const user = { id: 1, name: 'John', email: 'john@example.com' };
  
        jest.spyOn(usersService, 'getDataById').mockResolvedValue(user as any);
  
        const result = await usersController.getDataById(1);
  
        expect(result).toEqual(user);
      });
    });
  
    describe('deleteData', () => {
      it('should delete the user with the given ID', async () => {
        const deleteResult = { message: 'User deleted successfully' };
  
        jest.spyOn(usersService, 'deleteData').mockResolvedValue(deleteResult as any);
  
        const result = await usersController.deleteData(1);
  
        expect(result).toEqual(deleteResult);
      });
    });
   
    interface MockUser {
        id: number;
        name: string;
        email: string;
      }
      
      describe('create', () => {
        it('should create a new user', async () => {
          const createUserDto = { name: 'John', email: 'john@example.com' };
    
          jest.spyOn(usersService, 'saveData').mockResolvedValue({
            id: 1,
            name: 'John',
            email: 'john@example.com'
          });
          const result = await usersController.create(createUserDto);
    
          expect(result).toEqual(expect.objectContaining({
            id: expect.any(Number),
            name: createUserDto.name,
            email: createUserDto.email,
          }));
        });
      });    
      
      describe('updateUser', () => {
        it('should update the user with the given ID', async () => {
          const updateUserDto = { name: 'Updated John', email: 'updated-john@example.com' };
          const updatedUser = { id: 1, name: updateUserDto.name, email: updateUserDto.email };
      
          // Mock the behavior of the UsersService
          const updateUserMock = jest.fn().mockResolvedValue(updatedUser as any);
          Object.defineProperty(usersService, 'updateUser', { value: updateUserMock });
      
          // Call the updateUser method
          const result = await usersController.updateData(1, updateUserDto);
      
          // Assertions
          expect(result).toEqual(updatedUser);
          expect(updateUserMock).toHaveBeenCalledWith(1, updateUserDto);
        });
      });
      
});
  

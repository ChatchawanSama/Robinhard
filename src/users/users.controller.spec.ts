import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.model';

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
          },
        },
        {
          provide: User,
          useValue: {
            findAll: jest.fn(),
          },
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
      // Here, we use `users as any` to bypass the type checking

      const result = await usersController.getAllData();

      expect(result).toEqual(users);
    });
  });


  // Rest of the test cases...

  
});

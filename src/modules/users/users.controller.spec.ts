import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '@modules/users/users.service';
import { CreateUserDTO } from '@modules/users/dtos/create-user.dto';

const mockUserService = {
  create: jest.fn(),
};

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be able to create user', async () => {
    const userMock: CreateUserDTO = {
      email: 'dsad',
      age: 10,
      name: 'dsad',
      password: 'dsadas',
    };

    mockUserService.create.mockReturnValue({
      _id: 5,
    });

    const user = await controller.create(userMock);

    const spyMethod = jest.spyOn(mockUserService, 'create');

    expect(spyMethod).toHaveBeenCalled();
    expect(user._id).toBe(5);
  });
});

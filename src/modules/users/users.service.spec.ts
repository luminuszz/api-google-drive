import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '@modules/users/user.entity';
import { CreateUserDTO } from '@modules/users/dtos/create-user.dto';
import { BadRequestException } from '@nestjs/common';

const MockUserModel = {
  create: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
};

describe('UsersService', () => {
  let usersService: UsersService;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: MockUserModel,
        },
      ],
    }).compile();

    jest.clearAllMocks();

    usersService = module.get<UsersService>(UsersService);
  });

  describe('#create', () => {
    it('it should create a user', async () => {
      const createUser: CreateUserDTO = {
        age: 10,
        name: 'carlos',
        email: 'carlos@gmail.com',
        password: '123456',
      };

      MockUserModel.create.mockImplementation(() => ({ _id: '80' }));

      const user = await usersService.create(createUser);

      expect(user).toHaveProperty('_id');
    });

    it('it not should be able to create a new user with email already exists', async () => {
      const createUser: CreateUserDTO = {
        age: 10,
        name: 'carlos',
        email: 'carlos@gmail.com',
        password: '123456',
      };

      MockUserModel.find.mockReturnValue({
        age: 10,
        name: 'carlos',
        email: 'carlos@gmail.com',
        password: '123456',
      });

      await expect(usersService.create(createUser)).rejects.toBeInstanceOf(
        BadRequestException,
      );
    });
  });

  describe('#findById', () => {
    it('should be able to find user by id', async () => {
      const mockUser = {
        _id: 'algoa aqui',
        name: 'algo aqui',
      };

      MockUserModel.findById.mockReturnValue(mockUser);

      const user = await usersService.findById(mockUser._id);

      expect(user).toHaveProperty('_id');
      expect(user.name).toBe('algo aqui');
    });
  });

  describe('#findByEmail', () => {
    it('should be able to find user by email', async () => {
      const mockUser = {
        _id: 'algoa aqui',
        name: 'algo aqui',
        email: 'carlos@gmail.com',
      };

      MockUserModel.findOne.mockReturnValue(mockUser);

      const user = await usersService.findByEmail(mockUser._id);

      const spyMethod = jest.spyOn(MockUserModel, 'findOne');

      expect(user).toHaveProperty('_id');
      expect(spyMethod).toHaveBeenCalled();
      expect(user.email).toBe('carlos@gmail.com');
    });
  });

  describe('#updateUser', () => {
    it('should be able to update user', async () => {
      const user = {
        _id: '548874',
        name: 'calros',
        email: 'carlos@gmault.com',
      };

      MockUserModel.findOne.mockReturnValue(undefined);

      MockUserModel.findByIdAndUpdate.mockReturnValue({
        name: 'Jorge',
        _id: '548874',
        email: 'carlos@gmault.com',
      });

      const updatedUser = await usersService.updateUser(user._id, {
        ...user,
        name: 'Jorge',
      });

      expect(updatedUser.name).toBe('Jorge');
    });
    it('should not be able to update user if email already exists', async () => {
      const userUpdatedMock = {
        name: 'carlos',
        email: 'already exists',
      };

      MockUserModel.findOne.mockReturnValue({ email: 'already exists' });

      MockUserModel.findByIdAndUpdate.mockReturnValue({
        name: 'Jorge',
        _id: '548874',
        email: 'carlos@gmault.com',
      });

      await expect(
        usersService.updateUser('554', userUpdatedMock),
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });
});

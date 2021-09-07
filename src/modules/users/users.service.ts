import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@modules/users/user.entity';
import { Model } from 'mongoose';
import { CreateUserDTO } from '@modules/users/dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUser: CreateUserDTO): Promise<UserDocument> {
    const findUser = await this.userModel.find({ email: createUser.email });

    if (findUser) {
      throw new BadRequestException('User already exists');
    }

    return await this.userModel.create(createUser);
  }

  async findById(id: string) {
    return this.userModel.findById(id);
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async updateUser(
    id: string,
    updateUser: Partial<CreateUserDTO>,
  ): Promise<User> {
    if (updateUser?.email) {
      const verifyEmail = await this.findByEmail(updateUser.email);

      if (verifyEmail) throw new BadRequestException('Email already exists');
    }

    return this.userModel.findByIdAndUpdate(id, { ...updateUser });
  }
}

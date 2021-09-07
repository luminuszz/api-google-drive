import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '@modules/users/users.service';
import { CreateUserDTO } from '@modules/users/dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public async create(@Body() createUser: CreateUserDTO) {
    return await this.usersService.create(createUser);
  }
}

import * as bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpException,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user';
import { AuthGuard } from '@nestjs/passport';
import { JwtAdminAuthGuard } from '../auth/strategies/admin-strategy';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const formattedUser = {
      ...createUserDto,
      password: hashedPassword,
    };

    return this.usersService.createUser(formattedUser);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @UseGuards(new JwtAdminAuthGuard())
  @Get(':id')
  async getUserById(@Param('id') id: string, @Request() req: any) {
    const findUser = await this.usersService.getUserById(id);

    if (!findUser) throw new HttpException('User not found', 404);

    if (!req.user || !req.user.isAdmin) {
      throw new HttpException(
        'Unauthorized access: Admin privileges required',
        403,
      );
    }

    return findUser;
  }

  @UseGuards(new JwtAdminAuthGuard())
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: CreateUserDto,
    @Request() req: any,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);

    if (!isValid) throw new HttpException('Invalid ID', 400);

    if (!req.user || !req.user.isAdmin) {
      throw new HttpException(
        'Unauthorized access: Admin privileges required',
        403,
      );
    }

    const updatedUser = await this.usersService.updateUser(id, updateUserDto);

    if (!updatedUser) {
      throw new HttpException('User Not Found', 404);
    }
    return updatedUser;
  }

  @UseGuards(new JwtAdminAuthGuard())
  @Delete(':id')
  async deleteUser(
    @Param('id') id: string,
    @Request() req: any,
  ): Promise<void> {
    const isValid = mongoose.Types.ObjectId.isValid(id);

    if (!isValid) {
      throw new HttpException('Invalid ID', 400);
    }

    if (!req.user || !req.user.isAdmin) {
      throw new HttpException(
        'Unauthorized access: Admin privileges required',
        403,
      );
    }

    const deletedUser = await this.usersService.deleteUser(id);
    if (!deletedUser) throw new HttpException('User Not Found', 404);
  }
}

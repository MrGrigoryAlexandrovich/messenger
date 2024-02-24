import * as bcrypt from 'bcrypt';
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
} from '@nestjs/common';
import mongoose from 'mongoose';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user';
import { AuthGuard } from '@nestjs/passport';

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

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('User not found', 404);
    const findUser = await this.usersService.getUserById(id);
    if (!findUser) throw new HttpException('User not found', 404);
    return findUser;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: CreateUserDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const updatedUser = await this.usersService.updateUser(id, updateUserDto);
    if (!updatedUser) throw new HttpException('User Not Found', 404);
    return updatedUser;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const deletedUser = await this.usersService.deleteUser(id);
    if (!deletedUser) throw new HttpException('User Not Found', 404);
    return;
  }
}

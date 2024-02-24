import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from './schemas/userSchema';
import { CreateUserDto } from './dto/create-user';
import { AuthUserDto } from '../auth/dto/auth';

@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  getUsers() {
    return this.userModel.find();
  }

  async findOneWithUsername(username: string) {
    const user = await this.userModel.find({ username: username }).exec();
    return user[0];
  }

  async login({ username, password }: AuthUserDto) {
    const findUser = await this.findOneWithUsername(username);
    if (findUser) {
      const match = await bcrypt.compare(password, findUser.password);
      if (match) {
        const user = {
          password,
          ...findUser,
        };
        return this.jwtService.sign(user);
      }
    }
  }

  getUserById(id: string) {
    return this.userModel.findById(id);
  }

  updateUser(id: string, updateUserDto: CreateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}

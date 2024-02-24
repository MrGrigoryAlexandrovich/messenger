import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from '../users/schemas/userSchema';
import { AuthUserDto } from './dto/auth';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async findOneWithUsername(username: string) {
    const user = await this.userModel.find({ username: username }).exec();
    return user[0];
  }
  async login({ username, password }: AuthUserDto) {
    const findUser = await this.findOneWithUsername(username);
    if (!findUser) {
      throw new NotFoundException('User not found');
    } else {
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
}

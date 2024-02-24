import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { AuthUserDto } from 'src/users/dto/auth';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() authUserDto: AuthUserDto) {
    const user = await this.authService.login(authUserDto);
    if (!user) {
      throw new HttpException('The entered password is incorrect', 401);
    }
    return {
      token: user,
    };
  }
}

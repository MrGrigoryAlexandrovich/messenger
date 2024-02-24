import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VerifiedJwtPayload } from 'passport-jwt';

@Injectable()
export class JwtAdminAuthGuard extends AuthGuard('jwt') {
  async validate(payload: VerifiedJwtPayload): Promise<any> {
    if (!payload.isAdmin) {
      throw new UnauthorizedException(
        'Unauthorized access: Admin privileges required',
      );
    }
    return payload;
  }
}

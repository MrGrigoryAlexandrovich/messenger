import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users-modules';
import { ConfigModule } from '@nestjs/config';
import { AuthModules } from './auth/auth-modules';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB),
    UsersModule,
    AuthModules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

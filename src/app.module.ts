import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.modules';
import { ConfigModule } from '@nestjs/config';
import { AuthModules } from './auth/auth.modules';
import { MessagesController } from './messages/messages.controller';
import { MessagesService } from './messages/messages.service';
import { MessagesModule } from './messages/messages.modules';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB),
    MessagesModule,
    UsersModule,
    AuthModules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

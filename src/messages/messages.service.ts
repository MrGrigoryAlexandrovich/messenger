import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './schemas/messagesSchema';
import { CreateMessageDto } from './dto/message';
import { UpdateMessageDto } from './dto/updateMessage';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  createMessage(createMessageDto: CreateMessageDto) {
    const newMessage = new this.messageModel(createMessageDto);
    return newMessage.save();
  }

  getMessage(id: string) {
    return this.messageModel.findById(id);
  }

  async getConversation(senderId: string, receiverId: string) {
    const messages = await this.messageModel
      .find({
        $or: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      })
      .exec();

    return messages;
  }

  updateMessage(id: string, updateUserDto: UpdateMessageDto) {
    return this.messageModel.findByIdAndUpdate(id, updateUserDto);
  }

  deleteMessage(id: string) {
    return this.messageModel.findByIdAndDelete(id);
  }
}

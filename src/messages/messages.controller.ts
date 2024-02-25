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
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/message';
import { AuthGuard } from '@nestjs/passport';
import { UpdateMessageDto } from './dto/updateMessage';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async sendMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.createMessage(createMessageDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getConversation(@Param('id') receiverId: string, @Request() req: any) {
    const senderId = req.user._id;

    const findMessages = await this.messagesService.getConversation(
      senderId,
      receiverId,
    );

    if (!findMessages) {
      throw new HttpException('Message not found', 404);
    }

    return findMessages;
  }

  @Patch(':id')
  async updateMessage(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
    @Request() req: any,
  ) {
    const formattedUpdatedMessage = {
      ...updateMessageDto,
      updatedAt: new Date(),
    };
    const updatedMessage = await this.messagesService.updateMessage(
      id,
      formattedUpdatedMessage,
    );

    if (!updatedMessage) {
      throw new HttpException('Message Not Found', 404);
    }
    return formattedUpdatedMessage;
  }

  @Delete(':id')
  async deleteUser(
    @Param('id') id: string,
    @Request() req: any,
  ): Promise<void> {
    const deletedMessage = await this.messagesService.deleteMessagee(id);
    if (!deletedMessage) throw new HttpException('Message Not Found', 404);
  }
}

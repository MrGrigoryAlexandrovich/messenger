import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Message {
  @Prop({ required: true })
  senderId: string;

  @Prop({ required: true })
  receiverId: string;

  @Prop({ unique: false, required: true })
  text: string;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ unique: false, default: null, nullable: true })
  updatedAt: string | null;
}

export const MessagesSchema = SchemaFactory.createForClass(Message);

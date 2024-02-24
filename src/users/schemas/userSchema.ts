import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ default: false })
  isAdmin: boolean;

  @Prop({ default: null, nullable: true })
  avatar: string | null;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: null, nullable: true })
  updatedAt: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);

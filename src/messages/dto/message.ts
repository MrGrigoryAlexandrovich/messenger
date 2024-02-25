export class CreateMessageDto {
  readonly senderId: string;
  readonly receiverId: string;
  readonly text: string;
  readonly password: string;
  readonly createdAt: Date;
  readonly updatedAt?: string | null;
}

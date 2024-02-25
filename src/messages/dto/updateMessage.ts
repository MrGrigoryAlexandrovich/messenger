export class UpdateMessageDto {
  readonly senderId: string;
  readonly messageId: string;
  readonly text: string;
  readonly updatedAt?: Date | null;
}

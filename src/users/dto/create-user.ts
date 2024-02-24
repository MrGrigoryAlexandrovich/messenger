export class CreateUserDto {
  readonly id?: string;
  readonly username: string;
  readonly password: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly email: string;
  readonly isAdmin: boolean;
  readonly avatar?: string | null;
  readonly createdAt: Date;
  readonly updatedAt?: string | null;
}

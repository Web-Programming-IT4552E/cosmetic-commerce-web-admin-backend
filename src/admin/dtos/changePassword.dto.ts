import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  old_password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  new_password: string;
}

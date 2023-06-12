import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  active_token: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  new_password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  confirm_new_password: string;
}

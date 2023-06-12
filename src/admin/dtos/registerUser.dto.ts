import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  password: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  @MinLength(10)
  phone: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  @MinLength(1)
  fullname: string;
}

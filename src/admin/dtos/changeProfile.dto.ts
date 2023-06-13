import { IsString, IsOptional, IsDate } from 'class-validator';

export class ChangeProfileDto {
  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  fullname: string;

  @IsOptional()
  @IsDate()
  birthday: Date;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  avatar: string;
}

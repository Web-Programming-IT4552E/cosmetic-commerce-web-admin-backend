import { IsString, IsDateString, IsOptional } from 'class-validator';

export class ChangeProfileDto {
  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  fullname: string;

  @IsOptional()
  @IsDateString()
  birthday: Date;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  avatar: string;
}

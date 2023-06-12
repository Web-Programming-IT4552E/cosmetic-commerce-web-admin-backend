import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsString({ each: true })
  @IsArray()
  @IsMongoId({ each: true })
  category: string[];

  @IsOptional()
  @IsNumber()
  @IsPositive()
  width: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  height: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  mass: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  stock: number;

  @IsOptional()
  @IsUrl()
  image: string;
}

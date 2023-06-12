import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';
import { ProductStatus } from '../enums/product-status.enum';

export class UpdateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsString({ each: true })
  @IsArray()
  @IsMongoId({ each: true })
  category: string[];

  @IsNotEmpty()
  @IsEnum(ProductStatus)
  status: ProductStatus;

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

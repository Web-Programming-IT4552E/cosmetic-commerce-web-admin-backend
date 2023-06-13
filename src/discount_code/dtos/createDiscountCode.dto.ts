import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AmountType } from '../enums/amount-type.enum';
import { DiscountType } from '../enums/discount-type.enum';
import {
  DiscountCodeCondition,
  discountCodeCondition,
} from './discount_code_condition.dto';

export class CreateDiscountCodeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(DiscountType)
  discount_type: DiscountType;

  @IsNotEmpty()
  @IsEnum(AmountType)
  amount_type: AmountType;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  discount_amount: number;

  @ApiProperty({ type: () => [[discountCodeCondition]] })
  @IsOptional()
  @Type(() => discountCodeCondition)
  @ValidateNested({ each: true })
  customer_applying_condition: DiscountCodeCondition;

  @IsOptional()
  @IsNumber()
  @Min(0)
  min_order_value: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  total_remaining: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  maximum_apply_time_per_user: number;

  @IsNotEmpty()
  @IsDate()
  expired_time: Date;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty } from 'class-validator';

export const ConditionList = [
  'equal',
  'not equal',
  'greater than',
  'greater than or equal',
  'less than',
  'less than or equal',
] as const;
const UserFields = ['status', 'created_time', 'rank'];
export type ConditionType = (typeof ConditionList)[number];
export class discountCodeCondition {
  @ApiProperty({
    example: 'rank',
  })
  @IsNotEmpty()
  @IsIn(UserFields)
  object: string;

  @ApiProperty({
    example: 0,
  })
  @IsNotEmpty()
  value: unknown;

  @ApiProperty({
    example: 'greater than or equal',
  })
  @IsNotEmpty()
  @IsIn(ConditionList)
  condition: ConditionType;
}
export type DiscountCodeCondition = [discountCodeCondition[]];

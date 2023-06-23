/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dtos/paginationQuery.dto';

export class getListProductsQueryDto extends PaginationQueryDto {
  @ApiProperty({
    name: 'name',
    description: 'filter with name of the product',
    required: false,
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    name: 'category',
    description:
      'filter with category of the product, delimeter with "," : 62809b00a59bca48f8f34723,62809b70a59bca48f8f34724',
    example: '62809b00a59bca48f8f34723',
    required: false,
  })
  @IsOptional()
  @IsString()
  category: string;
}

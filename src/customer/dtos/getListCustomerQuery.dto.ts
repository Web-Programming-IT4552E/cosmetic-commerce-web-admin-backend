import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dtos/paginationQuery.dto';

export class GetListCustomerQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'rank string in the format : ?rank = "1,2"',
  })
  @IsOptional()
  @IsString()
  rank: string;
}

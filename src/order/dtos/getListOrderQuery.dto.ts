import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dtos/paginationQuery.dto';

export class GetListOrderQuery extends PaginationQueryDto {
  @ApiPropertyOptional({
    description: `status string in the format : ?status = "1,2"`,
  })
  @IsOptional()
  @IsString()
  status: string;

  @ApiProperty({
    name: 'start_time',
    description: 'filter with start_time, find orders created after start_time',
    example: '1/1/2023',
    required: false,
  })
  @IsOptional()
  @IsDate()
  start_time: Date;

  @ApiProperty({
    name: 'end_time',
    description: 'filter with end_time, find orders created before end_time',
    example: '12/31/2023',
    required: false,
  })
  @IsOptional()
  @IsDate()
  end_time: Date;
}

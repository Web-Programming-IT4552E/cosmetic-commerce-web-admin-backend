import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtDecodedData, Roles } from 'src/common/decorators/auth.decorator';
import { JwtPayload } from 'src/auth/dtos/jwt-payload.dto';
import { UserType } from 'src/user/enums/user-type.enum';
import { OrderService } from './order.service';
import { GetListOrderQuery } from './dtos/getListOrderQuery.dto';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({
    description: 'list order of current customer',
  })
  @ApiBearerAuth()
  @Roles([UserType.ADMIN])
  @Get('')
  async getListOrder(
    @Query() getListOrderQuery: GetListOrderQuery,
    @JwtDecodedData() jwtPayload: JwtPayload,
  ) {
    return this.orderService.getListOrder(getListOrderQuery, jwtPayload.email);
  }

  @ApiOperation({
    description: 'get detail order by id of current customer',
  })
  @ApiBearerAuth()
  @Roles([UserType.ADMIN])
  @Get('/:id')
  async getDetailOrder(
    @Param('id') order_id: string,
    @JwtDecodedData() jwtPayload: JwtPayload,
  ) {
    return this.orderService.getDetailOfAnOrder(order_id, jwtPayload.email);
  }
}

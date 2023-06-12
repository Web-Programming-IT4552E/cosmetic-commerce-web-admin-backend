import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/auth.decorator';
import { UserType } from 'src/user/enums/user-type.enum';
import { isValidObjectId } from 'mongoose';
import { OrderService } from './order.service';
import { GetListOrderQuery } from './dtos/getListOrderQuery.dto';
import { ConfirmDeliveryOrderDto } from './dtos/confirmDeliveryOrder.dto';

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
  async getListOrder(@Query() getListOrderQuery: GetListOrderQuery) {
    return this.orderService.getListOrder(getListOrderQuery);
  }

  @ApiOperation({
    description: 'get detail order by id of current customer',
  })
  @ApiBearerAuth()
  @Roles([UserType.ADMIN])
  @Get('/:id')
  async getDetailOrder(@Param('id') order_id: string) {
    return this.orderService.getDetailOfAnOrder(order_id);
  }

  @ApiOperation({
    description: 'Confirm order delivery',
  })
  @ApiBearerAuth()
  @Roles([UserType.ADMIN])
  @Patch('/confirm/:order_id')
  async confirmDeliveryOrder(
    @Param('order_id') order_id: string,
    @Body()
    confirmDeliveryOrderDto: ConfirmDeliveryOrderDto,
  ) {
    if (!isValidObjectId(order_id))
      throw new BadRequestException('Invalid order_id');
    return this.orderService.confirmDelivery(order_id, confirmDeliveryOrderDto);
  }

  @ApiOperation({
    description: 'Confirm successfully delivered order',
  })
  @ApiBearerAuth()
  @Roles([UserType.ADMIN])
  @Patch('/success/:order_id')
  async confirmSuccessfullyDeliveredOrder(@Param('order_id') order_id: string) {
    if (!isValidObjectId(order_id))
      throw new BadRequestException('Invalid order_id');
    return this.orderService.confirmSucessfullyDeliveredOrder(order_id);
  }

  @ApiOperation({
    description: 'Cancel order ',
  })
  @ApiBearerAuth()
  @Roles([UserType.ADMIN])
  @Delete('/:order_id')
  async cancelOrder(@Param('order_id') order_id: string) {
    if (!isValidObjectId(order_id))
      throw new BadRequestException('Invalid order_id');
    return this.orderService.cancelOrder(order_id);
  }
}

/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductService } from '../product/product.service';
import { OrderRepository } from './order.repository';
import { MailService } from '../mailer/mail.service';
import { GetListOrderQuery } from './dtos/getListOrderQuery.dto';
import { ConfirmDeliveryOrderDto } from './dtos/confirmDeliveryOrder.dto';
import { OrderStatus } from './enums/order-status.enum';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productService: ProductService,
    private readonly mailService: MailService,
  ) {}

  async getListOrder(getListOrderQuery: GetListOrderQuery) {
    const { page, limit, status } = { ...getListOrderQuery };
    const query = {};
    if (status) {
      Object.assign(query, {
        status: { $in: status.split(',').map((x) => +x) },
      });
    }
    const data = await this.orderRepository.getOrderList(query, page, limit);
    const total = await this.orderRepository.countNumberOfOrderWithQuery(query);
    return {
      paginationInfo: {
        page,
        limit,
        total,
      },
      data,
    };
  }

  async getDetailOfAnOrder(order_id: string) {
    const query = {
      _id: order_id,
    };
    return this.orderRepository.findOneOrder(query);
  }

  async confirmDelivery(
    order_id: string,
    confirmDeliveryOrderDto: ConfirmDeliveryOrderDto,
  ) {
    const query = { _id: order_id, status: OrderStatus.NEW };
    const updateOptions = {
      status: OrderStatus.CONFIRMED,
      ...confirmDeliveryOrderDto,
    };
    const updatedOrder = await this.orderRepository.findOneOrderAndUpdate(
      query,
      updateOptions,
    );
    if (!updatedOrder)
      throw new BadRequestException(
        'Can not confirm delivery this order ! The order does not exist or you are trying to confirm a non-new order !',
      );

    await this.mailService.sendOrderStatusChangedEmail(
      updatedOrder.customer_email,
      updatedOrder,
    );
    return updatedOrder;
  }

  async confirmSucessfullyDeliveredOrder(order_id: string) {
    const updatedOrder = await this.orderRepository.findOneOrderAndUpdate(
      { _id: order_id, status: OrderStatus.CONFIRMED },
      { status: OrderStatus.DONE },
    );
    if (!updatedOrder)
      throw new BadRequestException(
        'Can not confirm sucessfully delivered this order ! The order does not exist or you are trying to confirm successive of a non delivery-confirmation order !',
      );
    // TODO
    // if (order.user_id) {
    //   const toUpdatePointCustomer = await CustomerModel.findById(order.user_id);
    //   toUpdatePointCustomer.point += order.total_product_cost;
    //   toUpdatePointCustomer.rank_point += order.total_product_cost;
    //   const ranks = Object.keys(CustomerRankEntry)
    //     .filter(
    //       (key) =>
    //         Number.isNaN(Number(CustomerRankEntry[key])) &&
    //         Number(key) <= toUpdatePointCustomer.rank_point,
    //     )
    //     .map(Number);
    //   toUpdatePointCustomer.rank = ranks.indexOf(Math.max(...ranks));
    //   await toUpdatePointCustomer.save();
    // }
    await this.mailService.sendOrderStatusChangedEmail(
      updatedOrder.customer_email,
      updatedOrder,
    );
    return updatedOrder;
  }

  async cancelOrder(order_id: string) {
    const updatedOrder = await this.orderRepository.findOneOrderAndUpdate(
      {
        _id: order_id,
        $or: [{ status: OrderStatus.NEW }, { status: OrderStatus.CONFIRMED }],
      },
      { status: OrderStatus.CANCELLED },
    );
    if (!updatedOrder)
      throw new BadRequestException(
        'Can not cancel this order ! The order does not exist or you are trying to cancel a fully-successful/canceled order !',
      );
    await this.mailService.sendOrderStatusChangedEmail(
      updatedOrder.customer_email,
      updatedOrder,
    );
    return updatedOrder;
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { Order } from './schemas/order.schema';

@Injectable()
export class OrderRepository {
  constructor(
    @Inject(Order) private readonly orderModel: ReturnModelType<typeof Order>,
  ) {}

  async countNumberOfOrderWithQuery(
    query: FilterQuery<Order>,
  ): Promise<number> {
    return this.orderModel.countDocuments(query);
  }

  async getOrderList(
    query: FilterQuery<Order>,
    page: number,
    limit: number,
  ): Promise<Order[]> {
    return this.orderModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('user_id')
      .lean()
      .exec();
  }

  async findOneOrder(query: FilterQuery<Order>): Promise<Order> {
    return this.orderModel.findOne(query).lean().exec();
  }

  async findOneOrderAndUpdate(
    query: FilterQuery<Order>,
    updateOptions: UpdateQuery<Order>,
  ) {
    return this.orderModel
      .findOneAndUpdate(query, updateOptions, { new: true })
      .lean()
      .exec();
  }
}

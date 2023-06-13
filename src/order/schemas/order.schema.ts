import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { modelOptions, prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { getEnumValues } from '../../utils/enum-utils';
import { OrderStatus } from '../enums/order-status.enum';
import { OrderProduct } from './order-product.schema';
import { ShippingAddressDetail } from '../../shipping_address/schemas/shipping_address_detail.schema';

@modelOptions({
  schemaOptions: {
    timestamps: {
      createdAt: 'created_time',
      updatedAt: 'updated_time',
    },
  },
})
export class Order {
  /**
   * Order ID
   */
  @ApiProperty({ type: String })
  _id: Types.ObjectId;

  @prop({ required: true })
  order_id: number;

  /**
   * Purchased products
   */
  @prop({ type: OrderProduct, required: true, default: [], _id: false })
  products: Types.Array<OrderProduct>;

  /**
   * Order user ID
   */
  @ApiProperty({ type: String })
  @prop({ type: Types.ObjectId, ref: () => User })
  user_id?: Types.ObjectId;

  @prop({ required: true })
  customer_email: string;

  @prop({ required: true, type: ShippingAddressDetail, _id: false })
  shipping_address: ShippingAddressDetail;

  @prop({ required: true })
  payment_method: string;

  @prop({ required: true })
  total_product_cost: number;

  @prop({ required: true, default: 0 })
  discount: number;

  @prop({ required: false })
  shipping_unit?: string;

  @prop({ required: false })
  shipping_cost?: number;

  @prop({ required: false })
  shipping_code?: string;

  @prop({ required: true, enum: getEnumValues(OrderStatus) })
  status: OrderStatus;

  @prop()
  created_time?: Date;

  @prop()
  updated_at?: Date;

  @ApiHideProperty()
  @prop({ select: false })
  __v: number;
}

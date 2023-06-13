import { FilterQuery, UpdateQuery } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Admin } from 'src/admin/schemas/admin.schema';
import { Customer } from './schemas/customer.schema';

@Injectable()
export class CustomerRepository {
  constructor(
    @Inject(Customer)
    private readonly customerModel: ReturnModelType<typeof Admin>,
  ) {}

  async getCustomerList(
    query: FilterQuery<Customer>,
    selectQuery: any,
    page: number,
    limit: number,
  ) {
    return this.customerModel
      .find(query)
      .select(selectQuery)
      .skip(limit * (page - 1))
      .limit(limit)
      .lean();
  }

  async findCustomer(query: FilterQuery<Customer>) {
    return this.customerModel.find(query).lean();
  }

  async countCustomerWithQuery(query: FilterQuery<Customer>): Promise<number> {
    return this.customerModel.countDocuments(query);
  }

  async getCustomerDetail(query: FilterQuery<Customer>): Promise<Customer> {
    return this.customerModel.findOne(query).lean();
  }

  async updateCustomerDetail(
    query: FilterQuery<Customer>,
    updateOptions: UpdateQuery<Customer>,
  ) {
    return this.customerModel
      .findOneAndUpdate(query, updateOptions, {
        new: true,
      })
      .lean();
  }
}

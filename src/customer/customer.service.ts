/* eslint-disable dot-notation */
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserStatus } from '../user/enums/user-status.enum';
import { CustomerRepository } from './customer.repository';
import { GetListCustomerQueryDto } from './dtos/getListCustomerQuery.dto';
import { UpdateCustomerRankAndPointDto } from './dtos/updateCustomerRankAndPoint.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async getCustomerList(getListCustomerQueryDto: GetListCustomerQueryDto) {
    const { page, limit, rank } = { ...getListCustomerQueryDto };
    const query = { del_flag: false };
    const selectQuery = {};
    if (rank) {
      Object.assign(query, { rank: { $in: rank.split(',') } });
    }
    const data = await this.customerRepository.getCustomerList(
      query,
      selectQuery,
      page,
      limit,
    );
    const total = await this.customerRepository.countCustomerWithQuery(query);
    return {
      paginationInfo: {
        page,
        limit,
        total,
      },
      data,
    };
  }

  async getCustomerDetails(customer_id: string) {
    const query = { _id: customer_id, del_flag: false };
    return this.customerRepository.getCustomerDetail(query);
  }

  async blockCustomer(customer_id: string) {
    const query = {
      _id: customer_id,
      del_flag: false,
      status: UserStatus.ACTIVE,
    };
    const updateOptions = { status: UserStatus.INACTIVE };
    if (
      !(await this.customerRepository.updateCustomerDetail(
        query,
        updateOptions,
      ))
    ) {
      throw new BadRequestException(
        'Cannot block this user : Not found or already blocked',
      );
    }
  }

  async unblockCustomer(customer_id: string) {
    const query = {
      _id: customer_id,
      del_flag: false,
      status: UserStatus.INACTIVE,
    };
    const updateOptions = { status: UserStatus.ACTIVE };
    if (
      !(await this.customerRepository.updateCustomerDetail(
        query,
        updateOptions,
      ))
    ) {
      throw new BadRequestException(
        'Cannot unblock this user : Not found or already activated',
      );
    }
  }

  async findCustomerWithQuery(query: any) {
    return this.customerRepository.findCustomer(query);
  }

  async updateCustomerRankAndPoint(
    customer_id: string,
    updateCustomerRankAndPointDto: UpdateCustomerRankAndPointDto,
  ) {
    return this.customerRepository.updateCustomerDetail(
      { _id: customer_id },
      { ...updateCustomerRankAndPointDto },
    );
  }
}

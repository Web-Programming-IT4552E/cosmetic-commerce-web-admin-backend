/* eslint-disable no-restricted-syntax */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CustomerService } from 'src/customer/customer.service';
import { Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { GetListDiscountCodeQueryDto } from './dtos/getListDiscountCode.query.dto';
import { DiscountCodeRepository } from './discount_code.repository';
import { CreateDiscountCodeDto } from './dtos/createDiscountCode.dto';
import { DiscountCodeCondition } from './dtos/discount_code_condition.dto';

@Injectable()
export class DiscountCodeService {
  constructor(
    private readonly discountCodeRepository: DiscountCodeRepository,
    private readonly customerService: CustomerService,
  ) {}

  async getListDiscountCodes(
    getListDiscountCodeQueryDto: GetListDiscountCodeQueryDto,
  ) {
    const query = {};
    const selectOptions = {};
    const { page, limit } = { ...getListDiscountCodeQueryDto };
    const data =
      await this.discountCodeRepository.getListDiscountCodesWithPaginationAndSelect(
        query,
        selectOptions,
        page,
        limit,
      );
    const numberOfDiscountCodes =
      await this.discountCodeRepository.countDiscountCodeDocument(query);
    return {
      paginationInfo: {
        page,
        limit,
        total: numberOfDiscountCodes,
      },
      data,
    };
  }

  getDetailDiscountCode(discount_code_id: string) {
    const query = {
      _id: discount_code_id,
    };
    const selectOptions = {};
    return this.discountCodeRepository.getDiscountCodeDetailByID(
      query,
      selectOptions,
    );
  }

  async createDiscountCode(createDiscountCodeDto: CreateDiscountCodeDto) {
    const created_time = new Date();
    let conditionToSaved;
    let userQuery;
    if (createDiscountCodeDto.customer_applying_condition) {
      conditionToSaved = JSON.stringify(
        createDiscountCodeDto.customer_applying_condition,
      );
      userQuery = await this.getConditionsFromQuery(
        createDiscountCodeDto.customer_applying_condition,
      );
    }
    let users: any = await this.customerService.findCustomerWithQuery(
      userQuery,
    );
    if (!users)
      throw new BadRequestException('Found 0 users match your condition !');
    users = users.map((x: User) => x._id.toString());
    users = [...new Set(users.map((x: User) => x.toString()))];
    const newDiscountCode = Object({
      ...createDiscountCodeDto,
      customer_applying_condition: conditionToSaved,
      created_time,
      applied_user: [],
    });
    for (const x of users) {
      newDiscountCode.applied_user.push({
        user_id: new Types.ObjectId(x),
        remaining: createDiscountCodeDto.maximum_apply_time_per_user,
      });
    }
    await this.discountCodeRepository.createDiscountCode(newDiscountCode);
  }

  async inactivateDiscountCode(discount_code_id: string) {
    return this.discountCodeRepository.findOneAndUpdateDiscountCode(
      { _id: discount_code_id },
      {
        total_remaining: 0,
        expired_time: new Date(),
      },
    );
  }

  private async getConditionsFromQuery(objectToDecode: DiscountCodeCondition) {
    for (const x of objectToDecode) {
      for (const y of x) {
        const newY = {};
        const newKey = y.object;
        switch (y.condition) {
          case 'greater than': {
            newY[newKey] = {
              $gt: y.value,
            };
            break;
          }
          case 'greater than or equal': {
            newY[newKey] = {
              $gte: y.value,
            };
            break;
          }
          case 'less than': {
            newY[newKey] = {
              $lt: y.value,
            };
            break;
          }
          case 'less than or equal': {
            newY[newKey] = {
              $lte: y.value,
            };
            break;
          }
          case 'not equal': {
            newY[newKey] = {
              $ne: y.value,
            };
            break;
          }
          default: {
            newY[newKey] = y.value;
            break;
          }
        }
        // eslint-disable-next-line guard-for-in
        for (const member in y) delete y[member];
        Object.assign(y, newY);
      }
    }
    const resultArray = objectToDecode.map((x) => {
      return {
        $and: x,
      };
    });
    const result = {};
    // eslint-disable-next-line @typescript-eslint/dot-notation
    result['$or'] = resultArray;
    return result;
  }
}

import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/auth.decorator';
import { UserType } from 'src/user/enums/user-type.enum';
import { CustomerService } from './customer.service';
import { GetListCustomerQueryDto } from './dtos/getListCustomerQuery.dto';

@ApiTags('customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('')
  @ApiOperation({
    description: 'Gets customer list  ',
  })
  @ApiBearerAuth()
  @Roles([UserType.ADMIN])
  getCustomerList(@Query() getListCustomerQueryDto: GetListCustomerQueryDto) {
    return this.customerService.getCustomerList(getListCustomerQueryDto);
  }

  @Get('/:customer_id')
  @ApiOperation({
    description: 'Gets details of a customer ',
  })
  @ApiBearerAuth()
  @Roles([UserType.ADMIN])
  getCustomerDetails(@Param('customer_id') customer_id: string) {
    return this.customerService.getCustomerDetails(customer_id);
  }

  @Patch('/block/:customer_id')
  @ApiOperation({
    description: 'Temporary block customer ',
  })
  @ApiBearerAuth()
  @Roles([UserType.ADMIN])
  async blockCustomer(@Param('customer_id') customer_id: string) {
    await this.customerService.blockCustomer(customer_id);
    return {
      message: 'Blocked customer successfully',
    };
  }

  @Patch('/unblock/:customer_id')
  @ApiOperation({
    description: 'Unblock customer ',
  })
  @ApiBearerAuth()
  @Roles([UserType.ADMIN])
  async unblockCustomer(@Param('customer_id') customer_id: string) {
    await this.customerService.unblockCustomer(customer_id);
    return {
      message: 'UnBlocked customer successfully',
    };
  }
}

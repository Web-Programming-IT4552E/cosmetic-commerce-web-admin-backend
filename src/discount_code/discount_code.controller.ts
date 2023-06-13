import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/auth.decorator';
import { UserType } from 'src/user/enums/user-type.enum';
import { isValidObjectId } from 'mongoose';
import { DiscountCodeService } from './discount_code.service';
import { GetListDiscountCodeQueryDto } from './dtos/getListDiscountCode.query.dto';
import { CreateDiscountCodeDto } from './dtos/createDiscountCode.dto';

@ApiTags('discount-code')
@Controller('discount-code')
export class DiscountCodeController {
  constructor(private readonly discountCodeService: DiscountCodeService) {}

  @ApiOperation({
    description: 'get List Discount Code',
  })
  @ApiBearerAuth()
  @Roles([UserType.ADMIN])
  @Get()
  getListDiscountCodes(
    @Query() getListDiscountCodeQueryDto: GetListDiscountCodeQueryDto,
  ) {
    return this.discountCodeService.getListDiscountCodes(
      getListDiscountCodeQueryDto,
    );
  }

  @ApiOperation({
    description: 'Get discount code detail',
  })
  @ApiBearerAuth()
  @Roles([UserType.ADMIN])
  @Get(':id')
  findOne(@Param('id') discount_code_id: string) {
    return this.discountCodeService.getDetailDiscountCode(discount_code_id);
  }

  @ApiOperation({
    description: 'create Discount code',
  })
  @Post('')
  @ApiBearerAuth()
  @Roles([UserType.ADMIN])
  async createDiscountCode(
    @Body() createDiscountCodeDto: CreateDiscountCodeDto,
  ) {
    await this.discountCodeService.createDiscountCode(createDiscountCodeDto);
    return {
      message: 'Created Successfully',
    };
  }

  @ApiOperation({
    description: 'Get discount code detail',
  })
  @ApiBearerAuth()
  @Patch('/:discount_code_id')
  async inactivateDiscountCode(
    @Param('discount_code_id') discount_code_id: string,
  ) {
    if (!isValidObjectId(discount_code_id))
      throw new BadRequestException('Invalid discount_code ObjectID');
    const discountCode = await this.discountCodeService.inactivateDiscountCode(
      discount_code_id,
    );
    if (!discountCode) throw new NotFoundException('Cannot inactivated!');
    return {
      message: 'Inactivated successfully',
    };
  }
}

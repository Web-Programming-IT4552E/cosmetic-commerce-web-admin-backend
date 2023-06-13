import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CustomerModule } from 'src/customer/customer.module';
import { DiscountCodeService } from './discount_code.service';
import { DiscountCodeController } from './discount_code.controller';
import { discountCodeProviders } from './discount_code.provider';
import { DiscountCodeRepository } from './discount_code.repository';

@Module({
  imports: [DatabaseModule, CustomerModule],
  controllers: [DiscountCodeController],
  providers: [
    DiscountCodeService,
    DiscountCodeRepository,
    ...discountCodeProviders,
  ],
  exports: [DiscountCodeService],
})
export class DiscountCodeModule {}

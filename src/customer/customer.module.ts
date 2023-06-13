import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { customerProviders } from './customer.providers';
import { DatabaseModule } from '../database/database.module';
import { CustomerController } from './customer-account.controller';
import { CustomerRepository } from './customer.repository';
import { CustomerService } from './customer.service';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [CustomerService, CustomerRepository, ...customerProviders],
  controllers: [CustomerController],
  exports: [CustomerService],
})
export class CustomerModule {}

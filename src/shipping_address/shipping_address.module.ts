import { Module } from '@nestjs/common';
import { ShippingAddressService } from './shipping_address.service';
import { ShippingAddressRepository } from './shipping_address.repository';
import { shippingAddressProviders } from './shipping_address.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    ShippingAddressService,
    ShippingAddressRepository,
    ...shippingAddressProviders,
  ],
  exports: [ShippingAddressService],
})
export class ShippingAddressModule {}

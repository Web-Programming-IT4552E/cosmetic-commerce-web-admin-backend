import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ProductModule } from '../product/product.module';
import { MailModule } from '../mailer/mail.module';
import { OrderController } from './order.controller';
import { orderProviders } from './order.providers';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';

@Module({
  imports: [DatabaseModule, ProductModule, MailModule],
  providers: [OrderService, OrderRepository, ...orderProviders],
  controllers: [OrderController],
})
export class OrderModule {}

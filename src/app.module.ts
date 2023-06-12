import { Module, OnModuleDestroy } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import mongoose from 'mongoose';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from './database/database.module';
import { AreaModule } from './area/area.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { QueueModule } from './queue/queue.module';
import { MailModule } from './mailer/mail.module';
import { AdminModule } from './admin/admin.module';
import { RedisCacheModule } from './cache/redis/redis-cache.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './common/guards/auth.guard';
import { CommonModule } from './common/common.module';
import { ShippingAddressModule } from './shipping_address/shipping_address.module';
import { DiscountCodeModule } from './discount_code/discount_code.module';
import { RoleGuard } from './common/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    QueueModule,
    AreaModule,
    DatabaseModule,
    CategoryModule,
    ProductModule,
    OrderModule,
    MailModule,
    AdminModule,
    RedisCacheModule,
    AuthModule,
    CommonModule,
    ShippingAddressModule,
    DiscountCodeModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule implements OnModuleDestroy {
  async onModuleDestroy() {
    await mongoose.disconnect();
  }
}

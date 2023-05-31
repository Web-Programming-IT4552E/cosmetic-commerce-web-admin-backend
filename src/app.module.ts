import { Module, OnModuleDestroy } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import mongoose from 'mongoose';
import { DatabaseModule } from './database/database.module';
import { AreaModule } from './area/area.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AreaModule,
    DatabaseModule,
    CategoryModule,
    ProductModule,
  ],
})
export class AppModule implements OnModuleDestroy {
  async onModuleDestroy() {
    await mongoose.disconnect();
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import {
  FilterQuery,
  MongooseQueryOptions,
  Types,
  UpdateQuery,
} from 'mongoose';
import { Product } from './schemas/product.schema';
import { ProductStatus } from './enums/product-status.enum';
import { CreateProductDto } from './dtos/createProduct.dto';

@Injectable()
export class ProductRepository {
  constructor(
    @Inject(Product)
    private readonly productModel: ReturnModelType<typeof Product>,
  ) {}

  async countNumberOfProductWithQuery(
    query: MongooseQueryOptions,
  ): Promise<number> {
    return this.productModel.countDocuments(query);
  }

  async getProductList(
    query: MongooseQueryOptions,
    page: number,
    limit: number,
  ): Promise<Product[]> {
    return this.productModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('category')
      .lean()
      .exec();
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.productModel.findById(id).populate('category').lean().exec();
  }

  async getProductsByIdList(idList: string[]): Promise<Product[]> {
    return this.productModel
      .find({
        _id: { $in: idList.map((id) => new Types.ObjectId(id)) },
      })
      .lean()
      .exec();
  }

  async findOneProductAndUpdate(
    query: FilterQuery<Product>,
    updateOptions: UpdateQuery<Product>,
  ): Promise<Product | null> {
    return this.productModel.findOneAndUpdate(query, updateOptions);
  }

  async createProduct(createProductDto: CreateProductDto) {
    return this.productModel.create({
      ...createProductDto,
      status: ProductStatus.IN_STOCK,
    });
  }
}

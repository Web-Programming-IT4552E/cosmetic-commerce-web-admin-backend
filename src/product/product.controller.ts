import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { getListProductsQueryDto } from './dtos/getListProduct.dto';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ description: 'Get product list' })

  @Get('')
  async getProductList(@Query() getListProductQuery: getListProductsQueryDto) {
    return this.productService.getAllProducts(getListProductQuery);
  }

  @ApiOperation({ description: 'Get product info by ID' })
  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }
}

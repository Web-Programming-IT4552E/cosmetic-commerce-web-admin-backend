import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public, Roles } from 'src/common/decorators/auth.decorator';
import { UserType } from 'src/user/enums/user-type.enum';
import { ProductService } from './product.service';
import { getListProductsQueryDto } from './dtos/getListProduct.dto';
import { CreateProductDto } from './dtos/createProduct.dto';
import { UpdateProductDto } from './dtos/updateProduct.dto';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ description: 'Get product list' })
  @Public()
  @Get('')
  async getProductList(@Query() getListProductQuery: getListProductsQueryDto) {
    return this.productService.getAllProducts(getListProductQuery);
  }

  @ApiOperation({ description: 'Get product info by ID' })
  @Public()
  @Get(':product_id')
  async getProductById(@Param('product_id') id: string) {
    return this.productService.getProductById(id);
  }

  @ApiOperation({
    description: 'create Products information details',
  })
  @ApiBearerAuth()
  @Roles([UserType.ADMIN])
  @Post('')
  async createProduct(@Body() createProductDto: CreateProductDto) {
    await this.productService.createProduct(createProductDto);
    return {
      message: 'Created Successfully',
    };
  }

  @ApiOperation({
    description: 'update Products information details',
  })
  @ApiBearerAuth()
  @Roles([UserType.ADMIN])
  @Put('/:product_id')
  async updateProduct(
    @Body() updateProductDto: UpdateProductDto,
    @Param('product_id') product_id: string,
  ) {
    return this.productService.updateProduct(product_id, updateProductDto);
  }
}

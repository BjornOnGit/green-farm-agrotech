import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('products')
  findAllActive() {
    return this.productsService.findAllActive();
  }

  @Get('products/:id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Post('admin/products')
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Patch('admin/products/:id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
  }

  @Delete('admin/products/:id')
  softDelete(@Param('id') id: string) {
    return this.productsService.softDelete(id);
  }
}
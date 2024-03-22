import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

  constructor(private readonly productsService: ProductsService) { }

  @Post()
  async createProduct(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    const insertdata = await this.productsService.createProduct(title, description, price);
    return insertdata;
  }

  @Get()
  async getAllProducts() {
    const getData = await this.productsService.getAllProducts();
    return getData;
  }

  @Get(':id')
  async getProductById(@Param('id') id: number) {
    const data = await this.productsService.getProductById(id);
    return data;
  }

  @Put(':id')
  async updateProductById(@Param('id') id: number,
  @Body('title') title : string,
  @Body('description') description : string,
  @Body('price') price : number) {
    const data = await this.productsService.updateProductById(id,title,description,price);
    return data;
  }

  @Delete(':id')
  async deleteProduct (@Param('id') id: number){
    const data = await this.productsService.deleteProductById(id);
    return data;
  }

}

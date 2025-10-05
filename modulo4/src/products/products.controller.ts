import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Request } from "express";
import { AuthGuard } from "src/auth/auth.guard";
import { Product } from "src/entities/products.entity";
import { RolesGuard } from "src/decorators/roles.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/decorators/roles.enum";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService){}

    @Get()
    @HttpCode(200)
    getProducts(){
        return this.productsService.getProducts();
    }

    @Get('seeder')
    @HttpCode(200)
    seedProducts(){
        return this.productsService.seedProductsFromFile();
    }

    @Get(':id')
    @HttpCode(200)
    getProductsById(@Param('id') id: string){
        return this.productsService.getProductsById(id);
    }

    @UseGuards(AuthGuard)
    @Post()
    @HttpCode(201)
    createProducts(@Body() product: Partial<Product>, @Req() request: Request & { now: string}){
        return this.productsService.createProduct(product);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Put(':id')
    @Roles(Role.Admin)
    @HttpCode(200)
    updateProduct(@Query('id') id: string, @Body() product: Partial<Product>){
        return this.productsService.updateProduct(id, product);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    @HttpCode(200)
    deleteProduct(@Param('id') id: string){
        return this.productsService.deleteProduct(id);
    }
}
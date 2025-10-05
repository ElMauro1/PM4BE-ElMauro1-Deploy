import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { ProductsRepository } from "./products.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/entities/products.entity";
import { Category } from "src/entities/category.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Product, Category])],
    providers: [ProductsService, ProductsRepository,
        {
            provide: 'API_PRODUCTS',
            useFactory: async () => {
                const apiProducts = await fetch('https://fakestoreapi.com/products'
                ).then((response) => response.json());
                return apiProducts.map((product) => {
                    return {
                        id: product.id,
                        name: product.title,
                        description: product.description,
                        price: product.price,
                        stock: product.stock,
                        imgUrl: product.imgUrl,
                    }
                });
            }
        }
    ],
    controllers: [ProductsController],
})
export class ProductsModule {}
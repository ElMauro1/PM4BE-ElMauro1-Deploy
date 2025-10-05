import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/entities/category.entity";
import { Repository } from "typeorm";
import { Product } from "src/entities/products.entity";
import products from "../assets/Archivo actividad 3.json"

@Injectable()
export class ProductsService{
    constructor(private productsRepository: ProductsRepository,
        @InjectRepository(Category) private categoryRepo: Repository<Category> 
        // @Inject('API_PRODUCTS') private apiProducts: any[]
        ){}
    
    async getProducts(){
        return this.productsRepository.getProducts();
        // const dbProducts = await this.productsRepository.getProducts();
        // return [...dbProducts,
        //     //  ...this.apiProducts
        //     ];
    }

    async getProductsById(id: string){
        return this.productsRepository.getById(id);
    }

    async createProduct(product: Partial<Product>){
        return this.productsRepository.saveProduct(product);
    }

    async updateProduct(id: string, product: Partial<Product>){
        return this.productsRepository.updateProduct(id, product);
    }

    async deleteProduct(id: string){
        return this.productsRepository.deleteProduct(id);
    }

    async seedProductsFromFile(){
        for(const productData of products){
            const exists = await this.productsRepository.findByName(productData.name);
            if(!exists){
                const category = await this.categoryRepo.findOne({where: {name: productData.category}})
                if(!category) continue;
                await this.productsRepository.saveProduct({
                    name: productData.name,
                    description: productData.description,
                    price: productData.price,
                    stock: productData.stock,
                    category: category ?? undefined,
                })
            }
        }
        return {message: 'Seeder de productos ejecutado correctamente'}
    }
}
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/entities/products.entity";
import IProduct from "src/interfaces/IProduct";
import { Repository } from "typeorm";

@Injectable()
export class ProductsRepository {
    // private products = [
    //     {
    //         id: 1,
    //         name: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    //         description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    //         price: 109.95,
    //         stock: true,
    //         imgUrl: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    //     }
    // ];

    constructor(@InjectRepository(Product)
        private readonly repo: Repository<Product>){}

    async getProducts(): Promise<Product[]>{
        return this.repo.find();
    }

    async getById(id: string): Promise<Product | null>{
        return this.repo.findOne({where: {id}});
    }

    async saveProduct(product: Partial<Product>): Promise<Product>{
        const newProduct = this.repo.create(product);
        return this.repo.save(newProduct);
    }

    async updateProduct(id: string, product: Partial<Product>): Promise<Product | null>{
        const found = await this.repo.findOne({where: {id}})
        if(!found) return null;

        await this.repo.update(id, product);
        return this.repo.findOne({where: {id}});
    }

    async deleteProduct(id: string): Promise<{message: string}>{
        const result = await this.repo.delete(id);
        return result.affected
        ? {message: 'Producto eliminado correctamente'}
        : {message: 'Nose encontro el producto'}
    }

    async findByName(name: string): Promise<Product | null>{
        return this.repo.findOne({where: {name}})
    }
}


// id:number

// name: string

// description: string

// price: number

// stock: boolean

// imgUrl: string
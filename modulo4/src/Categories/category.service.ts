import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/entities/category.entity";
import { Repository } from "typeorm";
import products from "../assets/Archivo actividad 3.json"

@Injectable()
export class CategoriesService {
    constructor(@InjectRepository(Category) 
    private categoryRepository: Repository<Category>){}

    async seedCategoriesFromFile(){
        const categories = [...new Set(products.map((p)=> p.category))];
        
        for(const categoryNames of categories as string[]){
            const exists = await this.categoryRepository.findOne({where: {name: categoryNames},})
            
            if(!exists){
                const category = this.categoryRepository.create({name: categoryNames})
                await this.categoryRepository.save(category)
            }
        }
        return { message: 'Seeder ejecutado correctamente'}        
    }

    async getCategories(){
        return this.categoryRepository.find()
    }
}
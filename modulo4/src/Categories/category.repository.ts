import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/entities/category.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoriesRepository {
    constructor(@InjectRepository(Category) private readonly repo: Repository<Category>){}

    async getCategories():Promise<Category[]>{
        return this.repo.find();
    }

    async addCategories(categories: string[]): Promise<Category[]>{
        const result: Category[] = [];

        for(const name of categories){
            const exist = await this.repo.findOne({where: {name}});
            if(!exist){
                const newCategory = this.repo.create({name});
                result.push(await this.repo.save(newCategory));
            }
        }
        return result;
    }
}

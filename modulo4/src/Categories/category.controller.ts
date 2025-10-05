import { Controller, Get } from "@nestjs/common";
import { CategoriesService } from "./category.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly service: CategoriesService){}

    @Get('seeder')
    async seedCategories(){
        return this.service.seedCategoriesFromFile();
    }

    @Get()
    async findAll() {
        return this.service.getCategories();
    }
}
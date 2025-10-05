import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/entities/category.entity";
import { CategoriesController } from "./category.controller";
import { CategoriesRepository } from "./category.repository";
import { CategoriesService } from "./category.service";

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    controllers: [CategoriesController],
    providers: [CategoriesRepository, CategoriesService],
})
export class CategoryModule {}
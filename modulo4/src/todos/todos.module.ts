import { Module } from "@nestjs/common";
import { TodosService } from "./todos.service";
import { TodosControler } from "./todos.controller";
import { TodosRepository } from "./todos.repository";

const access = '123456';

@Module({
    providers: [TodosService, TodosRepository,
        {
            provide: 'ACCESS TOKEN',
            useValue: access
        }
    ],
    controllers: [TodosControler],
})
export class TodosModule {}
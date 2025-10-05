import { Injectable } from "@nestjs/common";

@Injectable()
export class TodosRepository {
    private todos = [
        {
            id: 1,
            title: 'Hacer la compra',
            completed: false,
        },
        {
            id: 2,
            title: 'Llevar el coche al taller',
            completed: true,
        }
    ]

    async getTodos(){
        return this.todos;
    }
}
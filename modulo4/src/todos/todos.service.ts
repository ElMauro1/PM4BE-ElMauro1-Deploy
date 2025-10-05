import { Inject, Injectable } from "@nestjs/common";
import { TodosRepository } from "./todos.repository";

@Injectable()
export class TodosService {

    constructor(private todosRepository: TodosRepository, @Inject('ACCESS TOKEN') private accessToken: string){}

    getTodos() {
        return this.accessToken === '12345' ?
        this.todosRepository.getTodos(): 'Acceso no autorizado';
    }
}
import { Inject, Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import IUser from "src/interfaces/IUser";
import { CreateUserDTO } from "src/dtos/createUser.dto";
import { UpdateUsertDTO } from "src/dtos/updateUser.dto";

@Injectable()
export class UsersService {
    
    constructor(private usersRepository: UsersRepository
        // , @Inject('API_USERS') private apiUsers: any[]
    ){}
    
    async getUsers(page: number, limit: number){
        return this.usersRepository.getUsers(page, limit);
    }
    getUserById(id: string) {
        return this.usersRepository.getById(id);
    }

    // getUserByName(name: string) {

    //     return this.usersRepository.getByName(name);
    // }

    createUser(user: CreateUserDTO){
        return this.usersRepository.createUser(user);
    }

    updateUser(id: string, user: UpdateUsertDTO ){
        return this.usersRepository.updateUser(id, user);
    }
    
    deleteUser(id: string){
        return this.usersRepository.deleteUser(id);
    }
}
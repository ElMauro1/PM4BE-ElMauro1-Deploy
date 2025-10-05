import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDTO } from "src/dtos/createUser.dto";
import { UpdateUsertDTO } from "src/dtos/updateUser.dto";
import { User } from "src/entities/users.entity";
import IUser from "src/interfaces/IUser";
import { Repository } from "typeorm";

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        ){}
    // private users = [
    //     {
    //         id: 1,
    //         email: 'laura@gmail.com',
    //         name: 'Laura',
    //         password: '123456',
    //         address: 'cra 1 # 1 - 1',
    //         phone: '3003116460',
    //         country: 'Colombia',
    //         city: 'Bucaramanga'
    //     },
    //     {
    //         id: 2,
    //         email: 'mauricio@gmail.com',
    //         name: 'Mauricio',
    //         password: '123456',
    //         address: 'cra 2 # 2 - 2',
    //         phone: '3003116461',
    //         country: 'Colombia',
    //         city: 'Bucaramanga'
    //     }
    // ];
    
    async getUsers(page: number, limit: number) {
        const [users, total] = await this.userRepo.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        });

        return {
            limit,
            page,
            totalPages: Math.ceil(total / limit),
            totalUsers: total,
            data: users.map(({password, ...rest})=> rest)
        }

        // const startIndex = (page - 1) * limit;
        // const endIndex = page * limit;

        // const paginatedUsers = this.users.slice(startIndex, endIndex);

        // return {
        //     limit,
        //     page,
        //     totalPages: Math.ceil(this.users.length / limit),
        //     totalUsers: this.users.length,
        //     data: paginatedUsers.map(({ password, ...rest }) => rest), // 🔒 sin password
        // };
    }

    
    async getById(id: string) {
        const user = await this.userRepo.findOne({
            where: {id},
            relations: ['orders']
        });

        if(!user) throw new NotFoundException(`Usuario con id ${id} no encontrado`);

        const {password, orders, ...rest} = user;

        return {
            ...rest,
            orders: orders.map((o)=> ({
                id: o.id,
                date: o.date
            }))
        }
    }

    async findByEmail(email: string) {
        return this.userRepo.findOne({where: {email}});
    }

    // async getByName(name: string) {
    //     return this.users.find(user => user.name === name);
    // }

    async createUser(user: CreateUserDTO){
        const newUser = this.userRepo.create(user);
        return await this.userRepo.save(newUser);
        
        // const id = this.users.length + 1;
        // this.users = [...this.users, {id, ...user}];
        // return {id, ...user}
    }

    async updateUser(id: string, user: UpdateUsertDTO){
        const existing = await this.userRepo.findOne({where: {id}});
        if(!existing) return undefined;

        const updated = this.userRepo.merge(existing, user);
        return await this.userRepo.save(updated);

        // const idUser = this.users.findIndex((user) => user.id === id);
        // if(idUser === -1) return undefined;
        
        // this.users[idUser] = { ...this.users[idUser], ...user };
        // return this.users[idUser];
    }

    async deleteUser(id: string){
        const result = await this.userRepo.delete(id);
        if(result.affected === 0){
            return {message: "Usuario no encontrado"};
        }
        return {message: 'Usuario eliminado correctamente'}
        // const idUser = this.users.findIndex((user) => user.id === id);
        // if(idUser !== -1) {
        //     this.users.splice(idUser, 1);  
        //     return {message: 'Usuario eliminado correctamente'}          
        // } else {
        //     return {message: 'Usuario no encontrado'}
        // }

    }
}

// id:number

// email: string

// name: string

// password: string

// address: string

// phone: string

// country?: string | undefined

// city?: string | undefined
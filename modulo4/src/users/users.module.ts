import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';

// const mockUsersService = {
//     getUsers: () => "Esto es un servicio mock de usuarios"
// }

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [
    //     {
    //     provide: UsersService,
    //     useValue: mockUsersService,
    // },
    UsersService,
    UsersRepository,
    {
        provide:'API_USERS',
        useFactory: async () => {
            const apiUsers = await fetch('https://jsonplaceholder.typicode.com/users'
            ).then((response) => response.json());
            return apiUsers.map((user) => {
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    password: user.password,
                    address: user.address,
                    phone: user.phone,
                    country: user.country,
                    city: user.city
                }
            });
        }
    }
],
    controllers: [UsersController],
    exports: [UsersRepository, UsersService, TypeOrmModule]
})
export class UsersModule {}
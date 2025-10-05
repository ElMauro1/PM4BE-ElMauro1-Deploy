import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersRepository } from "src/users/users.repository";
import { UsersModule } from "src/users/users.module";

@Module({
    imports: [UsersModule],
    providers: [AuthService, UsersRepository],
    controllers: [AuthController],
})
export class AuthModule {}
import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "src/entities/users.entity";
import { SignupDto } from "src/dtos/signup.dto";
import * as bcrypt from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { SigninDto } from "src/dtos/signin.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService
) {}

    async signup(signupDto: SignupDto){
        const { email, password } = signupDto;

        const existingUser = await this.usersRepository.findOne({where: {email}})
        if(existingUser) {
            throw new ConflictException("El correo ya esta registrado");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = this.usersRepository.create({
            ...signupDto,
            password: hashedPassword
        })

        const savedUser = await this.usersRepository.save(user)

        const { password: _, ...result } = savedUser;
        return result;
    }

    async signin(signinDto: SigninDto){
        const { email, password } = signinDto;

        const user = await this.usersRepository.findOne({where: {email}})

        if(!user || !(await bcrypt.compare(password, user.password))){
            throw new UnauthorizedException("Credenciales invalidas")
        }

        const payload = { sub: user.id, email: user.email, role: user.admin};
        const token = await this.jwtService.signAsync(payload, { expiresIn: '1h', secret: process.env.JWT_SECRET})

        const { password: _, ...userWithoutPass } = user;

        return {
            user: userWithoutPass,
            access_token: token,
        }
    }

    // async signIn(loginDto: LoginDto) {
    //     const { email, password } = loginDto;
  
    //     const user = await this.usersRepository.findByEmail(email);
  
    //     if (!user || user.password !== password) {
    //         throw new UnauthorizedException("Email o password incorrectos");
    //     }
  
    //     const { password: _, ...rest } = user;
    //     return {
    //         message: "Login exitoso",
    //         user: rest,
    //     };
    // }
}

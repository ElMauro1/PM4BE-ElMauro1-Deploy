import { BadRequestException, Body, Controller, HttpCode, Post, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupDto } from "src/dtos/signup.dto";
import { SigninDto } from "src/dtos/signin.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  async signup(@Body() signupDto: SignupDto){
    if(signupDto.password !== signupDto.confirmPassword){
      throw new BadRequestException("Las contraseñas no coinciden")
    }
    return this.authService.signup(signupDto);
  }

  @Post("signin")
  async signin(@Body() signinDto: SigninDto){
    try {
      return await this.authService.signin(signinDto);
    } catch (e) {
      throw new UnauthorizedException("Credenciales invalidas");
    }
  }

  // @Post('signin')
  // @HttpCode(200) 
  // async signIn(@Body() loginDto: LoginDto) {
  //   return this.authService.signIn(loginDto);
  // }
}

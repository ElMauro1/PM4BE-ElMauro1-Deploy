import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // 1. Verificar que exista el header Authorization
    const authHeader = request.headers["authorization"];
    if (!authHeader) {
      throw new UnauthorizedException("Authorization header is missing");
    }

    // 2. Validar que comience con "Bearer "
    if (!authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException(
        "Authorization header must start with 'Bearer <token>'"
      );
    }

    // 3. Extraer token
    const token = authHeader.replace("Bearer ", "").trim();

    try {
      // 4. Verificar token con clave secreta (desde .env)
      const secret = this.configService.get<string>("JWT_SECRET");
      const payload = await this.jwtService.verifyAsync(token, { secret });

      // 5. Adjuntar la info del usuario y expiración al request
      request.user = {
        ...payload,
        exp: payload.exp, // tiempo de expiración (epoch)
        iat: payload.iat, // tiempo de creación
      };

      return true;
    } catch (error) {
      throw new UnauthorizedException("Invalid or expired token");
    }
  }
}

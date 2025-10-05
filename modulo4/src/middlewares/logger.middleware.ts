import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, url } = req;
    const date = new Date().toISOString();

    console.log(`[${date}] ${method} ${url}`);
    next();
  }
}







// use(req: Request, res: Response, next: NextFunction) {
//     console.log(`Estas ejecutando un metodo ${req.method} en la ruta ${req.url}`);
//     next();
// }

// export const LoggerMiddlewareGlobal = (req: Request, res: Response, next: NextFunction) => {
//     console.log(`Estas ejecutando un metodo ${req.method} en la ruta ${req.url}`);
//     next();
// }
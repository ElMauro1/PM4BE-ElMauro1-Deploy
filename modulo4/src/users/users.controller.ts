import { Body, Controller, Delete, Get, Headers, HttpCode, Param, ParseUUIDPipe, Post, Put, Query, Req, Res, UseGuards, UseInterceptors } from "@nestjs/common";
import { UsersService } from "./users.service";
import type { Request, Response } from "express";
import { AuthGuard } from "src/auth/auth.guard";
import { DateAdderInterceptor } from "src/interceptors/date-adder.interceptor";
import type IUser from "src/interfaces/IUser";
import { CreateUserDTO } from "src/dtos/createUser.dto";
import { UpdateUsertDTO } from "src/dtos/updateUser.dto";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/decorators/roles.enum";
import { RolesGuard } from "src/decorators/roles.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
// @UseGuards(AuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(AuthGuard, RolesGuard)
    @Get()
    @Roles(Role.Admin)
    @HttpCode(200)
    getUsers(@Query('page') page: string, @Query('limit') limit: string,){
        const pageNum = page ? Number(page) : 1;   
        const limitNum = limit ? Number(limit) : 5;

        return this.usersService.getUsers(pageNum, limitNum);
    }
    
    @UseGuards(AuthGuard)
    @Get(':id')
    @HttpCode(200)
    getUserById(@Param('id', ParseUUIDPipe) id: string){
        return this.usersService.getUserById(id);
    }

    @Get('admin')
    @Roles(Role.Admin)
    getAdmin(){
        return "administrador;"
    }

    @Post()
    @HttpCode(201)
    createUser(@Body() user: CreateUserDTO, @Req() request: Request & { now: string }){      
        return this.usersService.createUser(user);
    }
    
    @UseGuards(AuthGuard)
    @Put(':id')
    @HttpCode(200)
    updateUser(@Query('id') id: string, @Body() user: UpdateUsertDTO){
        return this.usersService.updateUser(id, user);
    }
    
    @UseGuards(AuthGuard)
    @Delete(':id')
    @HttpCode(200)
    deleteUser(@Param('id') id: string){
        return this.usersService.deleteUser(id);
    }
}
// @Get('profile')
// getUserProfile(@Headers('token') token?: string){
// if(token !== '123456'){
//     return 'Acceso denegado';
// }
//     return 'Este endpoint es para obtener el perfil del usuario';
// }

// @UseGuards(AuthGuard)
// @Get('profile/image')
// getUserProileImage(){
//     return 'Este endpoint es para obtener la imagen del perfil del usuario';
// }

// @HttpCode(418)
// @Get('coffee')
// getCoffee(){
//     return 'No se hacer cafe, soy una tetera'
// }

// @Get('response')
// getResponseMessage(@Res() response: Response){
//     response.status(200).send('Este endpoint es para obtener un mensaje');
// }

// @Get('request')
// getRequestMessage(@Req() request: Request){
//     console.log(request);
//     return 'Este endpoint loguea el request';        
// }

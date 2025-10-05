import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "src/dtos/createOrder.dto";
import { Order } from "src/entities/order.entity";
import { AuthGuard } from "src/auth/auth.guard";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService){}

    @Post()
    @UseGuards(AuthGuard)
    async addOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order>{
        return this.orderService.addOrder(createOrderDto);
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async getOrder(@Param('id') id: string): Promise<Order>{
        return this.orderService.getOrder(id);
    }
}
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "src/entities/order.entity";
import { OrderDetail } from "src/entities/orderDetails.entity";
import { Product } from "src/entities/products.entity";
import { User } from "src/entities/users.entity";
import { OrderService } from "./order.service";
import { OrderRepository } from "./order.repository";
import { OrderController } from "./order.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Order, OrderDetail, Product, User])],
    controllers: [OrderController],
    providers: [OrderService, OrderRepository],
    exports: [TypeOrmModule, OrderService]
})
export class OrderModule {}
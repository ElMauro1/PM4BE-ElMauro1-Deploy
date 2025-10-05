import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateOrderDto } from "src/dtos/createOrder.dto";
import { Order } from "src/entities/order.entity";
import { OrderDetail } from "src/entities/orderDetails.entity";
import { Product } from "src/entities/products.entity";
import { User } from "src/entities/users.entity";
import { In, Repository } from "typeorm";

@Injectable()
export class OrderRepository {
    constructor(
        @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        @InjectRepository(Product) private readonly productRepo: Repository<Product>,
        @InjectRepository(OrderDetail) private readonly orderDetailRepo: Repository<OrderDetail>,
    ){}

    async addOrder(createOrderDto: CreateOrderDto): Promise<Order> {
        const { userId, products } = createOrderDto;

        // 1. Buscar usuario
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) throw new NotFoundException(`Usuario con id ${userId} no encontrado`);

        // 2. Buscar productos
        const productIds = products.map((p) => p.id);
        const foundProducts = await this.productRepo.find({ where: { id: In(productIds) } });

        if (foundProducts.length !== productIds.length) {
            throw new NotFoundException(`Uno o más productos no existen`);
        }

        // 3. Crear orden inicial (sin detalles)
        const order = this.orderRepo.create({
            user,
            total: 0,
        });
        await this.orderRepo.save(order);

        let total = 0;

        // 4. Procesar productos -> crear detalles
        for (const product of foundProducts) {
            if (product.stock <= 0) {
                throw new BadRequestException(`El producto ${product.name} no tiene stock disponible`);
            }

            // Reducir stock
            product.stock -= 1;
            await this.productRepo.save(product);

            // Crear detalle de orden
            const orderDetail = this.orderDetailRepo.create({
                price: product.price,
                product,
                order, // relación con la orden recién creada
            });

            await this.orderDetailRepo.save(orderDetail);

            total += Number(product.price);
        }

        // 5. Actualizar total de la orden
        order.total = total;
        await this.orderRepo.save(order);

        // 6. Devolver orden con relaciones
        const savedOrder = await this.orderRepo.findOne({
            where: { id: order.id },
            relations: ['orderDetails', 'orderDetails.product', 'user'],
        });

        if (!savedOrder) {
            throw new NotFoundException(`Orden con id ${order.id} no encontrada`);
        }

        return savedOrder;
        }

        async getOrder(id: string): Promise<Order> {
            const order = await this.orderRepo.findOne({
                where: { id },
                relations: ['orderDetails', 'orderDetails.product', 'user'],
        });

        if (!order) throw new NotFoundException(`Orden con id ${id} no encontrada`);
        return order;
    }
}

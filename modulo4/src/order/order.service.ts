import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from 'src/dtos/createOrder.dto';
import { Order } from 'src/entities/order.entity';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async addOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderRepository.addOrder(createOrderDto);
  }

  async getOrder(id: string): Promise<Order> {
    return this.orderRepository.getOrder(id);
  }
}

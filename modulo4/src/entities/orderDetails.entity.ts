import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from '../entities/order.entity';
import { Product } from '../entities/products.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('order_details')
export class OrderDetail {
  @ApiProperty({ example: 'uuid-v4', description: 'Identificador único del detalle de pedido' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 199.99, description: 'Precio del producto en el pedido' })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @ApiProperty({ example: 2, description: 'Cantidad del producto en el pedido' })
  @Column({type: 'int', default: 1})
  quantity: number;

  @ApiProperty({ type: () => Order, description: 'Pedido asociado' })
  @ManyToOne(()=> Order, (order)=> order.orderDetails, {onDelete: 'CASCADE'})
  order: Order;

  @ApiProperty({ type: () => Product, description: 'Producto asociado al detalle del pedido' })
  @ManyToOne(()=> Product, (product)=> product.orderDetails, {eager: true})
  product: Product;
}

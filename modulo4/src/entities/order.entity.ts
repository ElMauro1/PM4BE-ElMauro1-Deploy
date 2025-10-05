import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from '../entities/users.entity';
import { OrderDetail } from '../entities/orderDetails.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('orders')
export class Order {
  @ApiProperty({ example: 'uuid-v4', description: 'Identificador único del pedido' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: '2025-10-04T12:00:00.000Z', description: 'Fecha de creación del pedido' })
  @CreateDateColumn()
  date: Date;

  @ApiProperty({ type: () => User, description: 'Usuario que realizó el pedido' })
  @ManyToOne(() => User, (user) => user.orders, { eager: true, onDelete: 'CASCADE' })
  user: User;

  @ApiProperty({ type: () => [OrderDetail], description: 'Detalles del pedido' })
  @OneToMany(()=> OrderDetail, (orderDetail)=> orderDetail.order,{
    cascade: true,
    eager: true
  })
  orderDetails: OrderDetail[];

  @ApiProperty({ example: 199.99, description: 'Total del pedido' })
  @Column({type: 'decimal', precision: 12, scale: 2, default: 0})
  total: number;
}

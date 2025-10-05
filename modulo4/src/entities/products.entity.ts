import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinTable } from 'typeorm';
import { Category } from './category.entity';
import { OrderDetail } from '../entities/orderDetails.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('products')
export class Product {
  @ApiProperty({ example: 'uuid-v4', description: 'Identificador único del producto' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'iPhone 15', description: 'Nombre del producto' })
  @Column({ length: 50, nullable: false })
  name: string;

  @ApiProperty({ example: 'El mejor smartphone', description: 'Descripción del producto' })
  @Column({ type: 'text', nullable: false })
  description: string;

  @ApiProperty({ example: 1999.99, description: 'Precio del producto' })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @ApiProperty({ example: 10, description: 'Cantidad en stock' })
  @Column({ type: 'int', nullable: false })
  stock: number;

  @ApiProperty({ example: 'https://via.placeholder.com/150', description: 'URL de la imagen del producto' })
  @Column({
    type: 'text',
    default: 'https://via.placeholder.com/150',
  })
  imgUrl: string;

  @ApiProperty({ type: () => Category, description: 'Categoría del producto' })
  @ManyToOne(() => Category, (category) => category.products, { eager: true })
  category: Category;

  @ApiProperty({ type: () => [OrderDetail], description: 'Detalles de pedidos asociados al producto' })
  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  @JoinTable()
  orderDetails: OrderDetail[];
}

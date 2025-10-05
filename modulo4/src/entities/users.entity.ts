import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from '../entities/order.entity';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({ example: 'uuid-v4', description: 'Identificador único del usuario' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Laura Rico', description: 'Nombre completo del usuario' })
  @Column({ length: 50, nullable: false })
  name: string;

  @ApiProperty({ example: 'laura@mail.com', description: 'Correo electrónico del usuario' })
  @Column({ length: 50, unique: true, nullable: false })
  email: string;

  @Exclude()
  @Column({ type: 'text', nullable: false })
  password: string;

  @ApiProperty({ example: 3101234567, nullable: true, description: 'Número de teléfono del usuario' })
  @Column({ type: 'bigint', nullable: true })
  phone: number;

  @ApiProperty({ example: 'Colombia', nullable: true, description: 'País del usuario' })
  @Column({ length: 50, nullable: true })
  country: string;

  @ApiProperty({ example: 'Calle 123', nullable: true, description: 'Dirección del usuario' })
  @Column({ type: 'text', nullable: true })
  address: string;

  @ApiProperty({ example: 'Bogotá', nullable: true, description: 'Ciudad del usuario' })
  @Column({ length: 50, nullable: true })
  city: string;

  @ApiProperty({ type: () => [Order], description: 'Pedidos realizados por el usuario' })
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @ApiProperty({ example: false, description: 'Indica si el usuario es administrador', default: false })
  @Column({ default: false })
  @Exclude()
  admin: boolean;
}

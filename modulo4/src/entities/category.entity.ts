import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './products.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('categories')
export class Category {
  @ApiProperty({ example: 'uuid-v4', description: 'Identificador único de la categoría' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Electrónica', description: 'Nombre de la categoría' })
  @Column({ length: 50, unique: true })
  name: string;

  @ApiProperty({ type: () => [Product], description: 'Productos asociados a la categoría' })
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}

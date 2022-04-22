import { Category } from 'src/category/entities/category.entity';
import { OrderItem } from 'src/order/entities/order-item.entity';
import { Photo } from 'src/photo/entities/photo.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  description: string;

  @Column()
  available: boolean;

  @Column()
  barcode: string;

  @Column()
  weight: number;

  @Column()
  width: number;

  @Column()
  height: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Category, (category) => category.products, { eager: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToOne(() => Photo, (photo) => photo.product, { eager: true })
  photo: Photo;

  @OneToMany(() => OrderItem, (item) => item.product)
  orderItems: OrderItem[];
}

import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';

export enum OrderItemStatus {
  PENDING = 'pending',
  CANCELLED = 'cancelled',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
}

@Entity({ name: 'order_items' })
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  quantity: number;

  @Column({ type: 'enum', enum: OrderItemStatus })
  status: OrderItemStatus;

  @Column({ name: 'processed_at', type: 'datetime' })
  processedAt: Date;

  @Column({ name: 'transported_at', type: 'datetime' })
  transportedAt: Date;

  @Column({ name: 'fulfilled_at', type: 'datetime' })
  fulfilledAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Order, (order) => order.orderItems)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderItems, { eager: true })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}

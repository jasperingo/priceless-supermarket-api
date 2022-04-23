import { Customer } from 'src/customer/entities/customer.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './order-item.entity';

@Entity({ name: 'orders' })
export class Order {
  static readonly NUMBER_LENGTH = 8;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @Column()
  total: number;

  @Column({ name: 'delivery_address_street' })
  deliveryAddressStreet: string;

  @Column({ name: 'delivery_address_city' })
  deliveryAddressCity: string;

  @Column({ name: 'delivery_address_state' })
  deliveryAddressState: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Customer, (customer) => customer.orders, { eager: true })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @OneToMany(() => OrderItem, (item) => item.order, { eager: true })
  orderItems: OrderItem[];
}

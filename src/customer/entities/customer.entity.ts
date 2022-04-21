import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum CustomerStatus {
  ACTIVE = 'active',
  BLOCKED = 'blocked',
}

@Entity({ name: 'customers' })
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'email_address' })
  emailAddress: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: CustomerStatus })
  status: CustomerStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

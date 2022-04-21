import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum AdministratorStatus {
  ACTIVE = 'active',
  BLOCKED = 'blocked',
}

export enum AdministratorType {
  SUPER = 'super',
  ASSISTANT = 'assistant',
}

@Entity({ name: 'administrators' })
export class Administrator {
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

  @Column({ type: 'enum', enum: AdministratorType })
  type: AdministratorType;

  @Column({ type: 'enum', enum: AdministratorStatus })
  status: AdministratorStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

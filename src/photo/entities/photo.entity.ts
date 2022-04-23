import { Category } from 'src/category/entities/category.entity';
import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'photos' })
export class Photo {
  static readonly NAME_LENGTH = 20;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  size: number;

  @Column()
  width: number;

  @Column()
  height: number;

  @Column({ name: 'mime_type' })
  mimeType: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  url = null;
}

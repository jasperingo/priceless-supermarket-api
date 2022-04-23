import { Expose, Type } from 'class-transformer';
import { ProductDto } from 'src/product/dto/product.dto';

export class OrderItemDto {
  id: number;

  amount: number;

  quanity: number;

  @Type(() => Date)
  @Expose({ name: 'processed_at' })
  processedAt: Date;

  @Type(() => Date)
  @Expose({ name: 'transported_at' })
  transportedAt: Date;

  @Type(() => Date)
  @Expose({ name: 'fulfilled_at' })
  fulfilledAt: Date;

  @Type(() => Date)
  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Type(() => ProductDto)
  product: ProductDto;
}

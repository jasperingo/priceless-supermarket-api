import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ErrorCode } from 'src/error/error-code.constants';
import { ProductRepository } from '../product.repository';

@Injectable()
export class FetchGuard implements CanActivate {
  constructor(private productRepository: ProductRepository) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const productId = Number(req.params.id);

    if (isNaN(productId))
      throw new NotFoundException(
        'errors.id_not_number',
        ErrorCode.ID_NOT_NUMBER,
      );

    const product = await this.productRepository.findOne(productId);

    if (!product)
      throw new NotFoundException(
        'errors.product_do_not_exist',
        ErrorCode.PRODUCT_DO_NOT_EXIST,
      );

    req.data ? (req.data.product = product) : (req.data = { product });

    return true;
  }
}

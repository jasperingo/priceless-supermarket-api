import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ErrorCode } from 'src/error/error-code.constants';
import { CategoryRepository } from '../category.repository';

@Injectable()
export class FetchGuard implements CanActivate {
  constructor(private categoryRepository: CategoryRepository) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const categoryId = Number(req.params.id);

    if (isNaN(categoryId))
      throw new NotFoundException(
        'errors.id_not_number',
        ErrorCode.ID_NOT_NUMBER,
      );

    const category = await this.categoryRepository.findOne(categoryId);

    if (!category)
      throw new NotFoundException(
        'errors.category_do_not_exist',
        ErrorCode.CATEGORY_DO_NOT_EXIST,
      );

    req.data ? (req.data.category = category) : (req.data = { category });

    return true;
  }
}

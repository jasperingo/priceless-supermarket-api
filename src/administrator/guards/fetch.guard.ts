import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ErrorCode } from 'src/error/error-code.constants';
import { AdministratorRepository } from '../administrator.repository';

@Injectable()
export class FetchGuard implements CanActivate {
  constructor(private administratorsRepository: AdministratorRepository) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const administratorId = Number(req.params.id);

    if (isNaN(administratorId))
      throw new NotFoundException(
        'errors.id_not_number',
        ErrorCode.ID_NOT_NUMBER,
      );

    const administrator = await this.administratorsRepository.findOne(
      administratorId,
    );

    if (!administrator)
      throw new NotFoundException(
        'errors.administrator_do_not_exist',
        ErrorCode.CUSTOMER_DO_NOT_EXIST,
      );

    req.data
      ? (req.data.administrator = administrator)
      : (req.data = { administrator });

    return true;
  }
}

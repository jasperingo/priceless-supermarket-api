import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ErrorCode } from 'src/error/error-code.constants';
import { CustomerRepository } from '../customer.repository';

@Injectable()
export class FetchGuard implements CanActivate {
  constructor(private customerRepository: CustomerRepository) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const customerId = Number(req.params.id);

    if (isNaN(customerId))
      throw new NotFoundException(
        'errors.id_not_number',
        ErrorCode.ID_NOT_NUMBER,
      );

    const customer = await this.customerRepository.findOne(customerId);

    if (!customer)
      throw new NotFoundException(
        'errors.customer_do_not_exist',
        ErrorCode.CUSTOMER_DO_NOT_EXIST,
      );

    req.data ? (req.data.customer = customer) : (req.data = { customer });

    return true;
  }
}

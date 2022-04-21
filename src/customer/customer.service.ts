import { Injectable } from '@nestjs/common';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { PasswordHashService } from 'src/utils/password-hash/password-hash.service';
import { CustomerRepository } from './customer.repository';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer, CustomerStatus } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    private readonly customersRepository: CustomerRepository,
    private readonly passwordHashService: PasswordHashService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(createCustomer: Customer) {
    createCustomer.status = CustomerStatus.ACTIVE;
    createCustomer.password = await this.passwordHashService.hashPassword(
      createCustomer.password,
    );

    return this.customersRepository.save(createCustomer);
  }

  findAll() {
    return this.paginationService
      .paginateQuery(
        'customer.id',
        this.customersRepository.createQueryBuilder('customer'),
      )
      .orderBy('customer.createdAt', 'DESC')
      .getMany();
  }

  findOne(id: number) {
    return this.customersRepository.findOne(id);
  }

  update(customer: Customer, updateCustomerDto: UpdateCustomerDto) {
    Object.keys(updateCustomerDto).forEach(
      (prop) => (customer[prop] = updateCustomerDto[prop] ?? customer[prop]),
    );
    return this.customersRepository.save(customer);
  }
}

import { EntityRepository, Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  async existsByEmailAddress(emailAddress: string) {
    const customer = await this.findOne({ where: { emailAddress } });
    return !!customer;
  }

  async existsByPhoneNumber(phoneNumber: string) {
    const customer = await this.findOne({ where: { phoneNumber } });
    return !!customer;
  }

  findByEmailAddress(emailAddress: string) {
    return this.findOne({ where: { emailAddress } });
  }

  findByPhoneNumber(phoneNumber: string) {
    return this.findOne({ where: { phoneNumber } });
  }
}

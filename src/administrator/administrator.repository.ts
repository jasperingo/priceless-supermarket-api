import { EntityRepository, Repository } from 'typeorm';
import { Administrator } from './entities/administrator.entity';

@EntityRepository(Administrator)
export class AdministratorRepository extends Repository<Administrator> {
  async existsByEmailAddress(emailAddress: string) {
    const admin = await this.findOne({ where: { emailAddress } });
    return !!admin;
  }

  async existsByPhoneNumber(phoneNumber: string) {
    const admin = await this.findOne({ where: { phoneNumber } });
    return !!admin;
  }

  findByEmailAddress(emailAddress: string) {
    return this.findOne({ where: { emailAddress } });
  }

  findByPhoneNumber(phoneNumber: string) {
    return this.findOne({ where: { phoneNumber } });
  }
}

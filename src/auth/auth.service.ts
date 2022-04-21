import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdministratorRepository } from 'src/administrator/administrator.repository';
import { Administrator } from 'src/administrator/entities/administrator.entity';
import { CustomerRepository } from 'src/customer/customer.repository';
import { Customer } from 'src/customer/entities/customer.entity';
import { PasswordHashService } from 'src/utils/password-hash/password-hash.service';

export enum UserType {
  CUSTOMER,
  ADMINISTRATOR,
}

export type AuthJWT = { sub: number; type: UserType };

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly customersRepository: CustomerRepository,
    private readonly administratorsRepository: AdministratorRepository,
    private readonly passwordHashService: PasswordHashService,
  ) {}

  async authCustomer(emailAddress: string, password: string) {
    const customer = await this.customersRepository.findByEmailAddress(
      emailAddress,
    );

    if (
      customer &&
      (await this.passwordHashService.comparePassword(
        password,
        customer.password,
      ))
    ) {
      delete customer.password;
      return customer;
    }

    return null;
  }

  signInCustomer(customer: Customer) {
    const payload: AuthJWT = { sub: customer.id, type: UserType.CUSTOMER };
    return {
      id: customer.id,
      access_token: this.jwtService.sign(payload),
    };
  }

  async authAdministrator(emailAddress: string, password: string) {
    const admin = await this.administratorsRepository.findByEmailAddress(
      emailAddress,
    );

    if (
      admin &&
      (await this.passwordHashService.comparePassword(password, admin.password))
    ) {
      delete admin.password;
      return admin;
    }

    return null;
  }

  signInAdministrator(administrator: Administrator) {
    const payload: AuthJWT = {
      sub: administrator.id,
      type: UserType.ADMINISTRATOR,
    };

    return {
      id: administrator.id,
      access_token: this.jwtService.sign(payload),
    };
  }
}

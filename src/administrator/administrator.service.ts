import { Injectable } from '@nestjs/common';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { PasswordHashService } from 'src/utils/password-hash/password-hash.service';
import { AdministratorRepository } from './administrator.repository';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import {
  Administrator,
  AdministratorStatus,
  AdministratorType,
} from './entities/administrator.entity';

@Injectable()
export class AdministratorService {
  constructor(
    private readonly administratorsRepository: AdministratorRepository,
    private readonly passwordHashService: PasswordHashService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(unsavedAdministrator: Administrator) {
    unsavedAdministrator.type = AdministratorType.ASSISTANT;
    unsavedAdministrator.status = AdministratorStatus.ACTIVE;
    unsavedAdministrator.password = await this.passwordHashService.hashPassword(
      unsavedAdministrator.password,
    );

    return this.administratorsRepository.save(unsavedAdministrator);
  }

  findAll() {
    return this.paginationService
      .paginateQuery(
        'administrator.id',
        this.administratorsRepository.createQueryBuilder('administrator'),
      )
      .orderBy('administrator.created_at', 'DESC')
      .getMany();
  }

  findOne(id: number) {
    return this.administratorsRepository.findOne(id);
  }

  update(
    administrator: Administrator,
    updateAdministratorDto: UpdateAdministratorDto,
  ) {
    Object.keys(updateAdministratorDto).forEach(
      (prop) =>
        (administrator[prop] =
          updateAdministratorDto[prop] ?? administrator[prop]),
    );
    return this.administratorsRepository.save(administrator);
  }
}

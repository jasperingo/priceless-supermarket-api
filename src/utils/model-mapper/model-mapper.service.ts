import { Injectable } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';

@Injectable()
export class ModelMapperService {
  entityToDto<T>(classConstructor: ClassConstructor<T>, plain: any) {
    return plainToInstance(classConstructor, plain, {
      ignoreDecorators: true,
      enableCircularCheck: true,
    });
  }
}

import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PhotoRepository } from '../photo.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsExistingPipe implements ValidatorConstraintInterface {
  constructor(private readonly photoRepository: PhotoRepository) {}

  validate(id: number) {
    return this.photoRepository.existsById(id);
  }
}

export function IsExisting(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsExistingPipe,
    });
  };
}

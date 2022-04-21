import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PhotoRepository } from 'src/photo/photo.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsNotRelatedConstraint implements ValidatorConstraintInterface {
  constructor(private readonly photoRepository: PhotoRepository) {}

  async validate(id: number, args: ValidationArguments) {
    const property = args.constraints[0] as string;

    const category = await this.photoRepository.findOne(id, {
      relations: [property],
    });

    return category && category[property] === null;
  }
}

export function IsNotRelatedPhoto(
  relation: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [relation],
      validator: IsNotRelatedConstraint,
    });
  };
}

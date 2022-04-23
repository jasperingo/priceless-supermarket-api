import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { lastValueFrom } from 'rxjs';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsValidLocationPipe implements ValidatorConstraintInterface {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async validate(state: string, args: ValidationArguments) {
    const encodedState = encodeURIComponent(state);
    const result = await lastValueFrom(
      this.httpService.get(
        `${this.configService.get('LOCATIONS_API')}${encodedState}/lgas`,
      ),
    );

    if (Array.isArray(result.data)) {
      return result.data.includes((args.object as any).deliveryAddressCity);
    }

    return false;
  }
}

export function IsValidLocation(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidLocationPipe,
    });
  };
}

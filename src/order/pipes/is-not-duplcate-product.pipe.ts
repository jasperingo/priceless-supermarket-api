import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsNotDuplcateProduct(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(values: any[]) {
          const seen = new Set();
          return !values.some(
            (currentObject: any) =>
              seen.size === seen.add(currentObject.productId).size,
          );
        },
      },
    });
  };
}

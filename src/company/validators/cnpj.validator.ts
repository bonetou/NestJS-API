import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsCNPJ(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsCNPJ',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return typeof value === 'string' && RegExp('^[0-9]{14}$').test(value);
        },
      },
    });
  };
}
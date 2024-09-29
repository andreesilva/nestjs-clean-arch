import { FieldsErrors } from '../validators/validator-fields.interface';
export class ValidatorError extends Error {}

export class EntityValidatorError extends Error {
  constructor(public error: FieldsErrors) {
    super();
  }
}

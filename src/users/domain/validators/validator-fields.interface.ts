export type FildErrors = {
  [field: string]: string[];
};

export interface ValidatorFieldsInterface<PropsValidated> {
  errors: FildErrors;
  validatedData: PropsValidated;
  validate(data: any): boolean;
}

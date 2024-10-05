import { ClassValidatorFields } from '../../class-validator-fields';
import * as libClassValidator from 'class-validator';

class StubClassValidatorFields extends ClassValidatorFields<{
  field: string;
}> {}

describe('ClassValidatorFields unit tests', () => {
  it('Should return error if validation fails', () => {
    const sut = new StubClassValidatorFields();

    expect(sut.errors).toBeNull();
    expect(sut.validatedData).toBeNull();
  });

  it('Should validate with errors', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync');
    spyValidateSync.mockReturnValue([
      {
        property: 'field',
        constraints: {
          isRequired: 'test error',
        },
      },
    ]);
    const sut = new StubClassValidatorFields();
    expect(sut.validate(null)).toBeFalsy();
    expect(sut.errors).toStrictEqual({ field: ['test error'] });
    expect(sut.validatedData).toBeNull();
    expect(spyValidateSync).toHaveBeenCalled();
  });

  it('Should validate without errors', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync');
    spyValidateSync.mockReturnValue([]);
    const sut = new StubClassValidatorFields();
    expect(sut.validate({ field: 'value' })).toBeTruthy();
    expect(sut.validatedData).toStrictEqual({ field: 'value' });
    expect(sut.errors).toBeNull();
    expect(spyValidateSync).toHaveBeenCalled();
  });
});

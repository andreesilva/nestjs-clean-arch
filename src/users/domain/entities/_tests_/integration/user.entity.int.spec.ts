import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';
import { UserEntity, UserProps } from '../../user.entity';
import { EntityValidationError } from '@/shared/domain/errors/validation-error';

describe('UserEntity integration tests', () => {
  describe('Constructor method', () => {
    it('Should throw an error when creating a user with invalid name', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        name: null,
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        name: 'a'.repeat(256),
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        name: 10 as any,
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);
    });

    it('Should throw an error when creating a user with invalid email', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        email: null,
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        email: 'a'.repeat(256),
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        email: 10 as any,
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);
    });

    it('Should throw an error when creating a user with invalid password', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        password: null,
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        password: 'a'.repeat(101),
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        password: 10 as any,
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);
    });

    it('Should throw an error when creating a user with invalid createdAt', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        createdAt: '1019' as any,
      };

      props = {
        ...UserDataBuilder({}),
        createdAt: 10 as any,
      };
      expect(() => new UserEntity(props)).toThrow(EntityValidationError);
    });

    it('Should a valid user', () => {
      expect.assertions(0);

      const props: UserProps = {
        ...UserDataBuilder({}),
      };

      new UserEntity(props);
    });
  });

  describe('Update method', () => {
    it('Should throw an error when update a user with invalid name', () => {
      const entity = new UserEntity(UserDataBuilder({}));

      expect(() => entity.update(null)).toThrow(EntityValidationError);
      expect(() => entity.update('')).toThrow(EntityValidationError);
      expect(() => entity.update(20 as any)).toThrow(EntityValidationError);
      expect(() => entity.update('a'.repeat(256))).toThrow(
        EntityValidationError,
      );
    });

    it('Should a valid user update', () => {
      expect.assertions(0);

      const props: UserProps = {
        ...UserDataBuilder({}),
      };

      const entity = new UserEntity(props);

      entity.update('Marcos');
    });
  });

  describe('Update password method', () => {
    it('Should throw an error when update password a user with invalid', () => {
      const entity = new UserEntity(UserDataBuilder({}));

      expect(() => entity.updatePassoword(null)).toThrow(EntityValidationError);
      expect(() => entity.updatePassoword('')).toThrow(EntityValidationError);
      expect(() => entity.updatePassoword(20 as any)).toThrow(
        EntityValidationError,
      );
      expect(() => entity.updatePassoword('a'.repeat(101))).toThrow(
        EntityValidationError,
      );
    });

    it('Should a valid user update', () => {
      expect.assertions(0);

      const props: UserProps = {
        ...UserDataBuilder({}),
      };

      const entity = new UserEntity(props);

      entity.update('senha informada');
    });
  });
});

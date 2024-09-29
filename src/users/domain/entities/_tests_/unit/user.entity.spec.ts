import { UserEntity, UserProps } from '../../user.entity';
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';

describe('UserEntity unit tests', () => {
  let sut: UserEntity;
  let props: UserProps;

  beforeEach(() => {
    props = UserDataBuilder({});
    sut = new UserEntity(props);
  });

  it('Constructor method', () => {
    const sut = new UserEntity(props);

    expect(sut.props.name).toEqual(props.name);
    expect(sut.props.email).toEqual(props.email);
    expect(sut.props.password).toEqual(props.password);
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  it('Getter name field', () => {
    expect(sut.props.name).toEqual(props.name);
    expect(sut.props.name).toBeDefined();
    expect(typeof sut.props.name).toBe('string');
  });

  it('Setter name field', () => {
    sut['name'] = 'new name';
    expect(sut.props.name).toEqual(props.name);

    expect(typeof sut.props.name).toBe('string');
  });

  it('Getter email field', () => {
    expect(sut.props.email).toEqual(props.email);
    expect(sut.props.email).toBeDefined();
    expect(typeof sut.props.email).toBe('string');
  });

  it('Getter password field', () => {
    expect(sut.props.password).toEqual(props.password);
    expect(sut.props.password).toBeDefined();
    expect(typeof sut.props.password).toBe('string');
  });

  it('Setter password field', () => {
    sut['name'] = 'new password';
    expect(sut.props.password).toEqual(props.password);

    expect(typeof sut.props.password).toBe('string');
  });

  it('Getter createdAt field', () => {
    expect(sut.props.createdAt).toBeDefined();
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  it('Should update a user name', () => {
    sut.update('other name');
    expect(sut.props.name).toEqual('other name');
  });

  it('Should update a user password', () => {
    sut.updatePassoword('other password');
    expect(sut.props.password).toEqual('other password');
  });
});

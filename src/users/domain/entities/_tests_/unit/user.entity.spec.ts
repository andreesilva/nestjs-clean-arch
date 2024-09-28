import { faker } from '@faker-js/faker/locale/en';
import { UserEntity, UserProps } from '../../user.entity';

describe('UserEntity unit tests', () => {
  let sut: UserEntity;
  let props: UserProps;

  beforeEach(() => {
    props = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    sut = new UserEntity(props);
  });

  it('Constructor method', () => {
    const props = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
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
  it('Getter createdAt field', () => {
    expect(sut.props.createdAt).toBeDefined();
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });
});

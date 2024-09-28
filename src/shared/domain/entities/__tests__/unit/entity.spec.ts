import { Entity } from '../../entity';
import { validate as uuidValidate } from 'uuid';

type StubProps = {
  prop1: string;
  prop2: number;
};

class StubEntity extends Entity<StubProps> {}

describe('UserEntity unit tests', () => {
  it('Shuld set props and id', () => {
    const props = {
      prop1: 'value1',
      prop2: 15,
    };
    const entity = new StubEntity(props);

    expect(entity.props).toStrictEqual(props);
    expect(entity._id).not.toBeNull();
    expect(uuidValidate(entity._id)).toBeTruthy();
  });

  it('Should accept  a valid uuid', () => {
    const props = {
      prop1: 'value1',
      prop2: 15,
    };

    const id = '72b4410a-dff3-4419-aab8-aef1e4c1c7a7';

    const entity = new StubEntity(props, id);

    expect(uuidValidate(entity._id)).toBeTruthy();
  });

  it('Should convert a entity to a javascript object', () => {
    const props = {
      prop1: 'value1',
      prop2: 15,
    };

    const id = '72b4410a-dff3-4419-aab8-aef1e4c1c7a7';

    const entity = new StubEntity(props, id);

    expect(entity.toJSON()).toStrictEqual({ id, ...props });
  });
});

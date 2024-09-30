import { Entity } from '../entities/entity';
import { InMemoryRepository } from './in-memory.repository';

import { SearchRepositoryInterface } from './seachable-repository-contract';

export abstract class InMemorySearchableRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchRepositoryInterface<E, any, any>
{
  search(props: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
}

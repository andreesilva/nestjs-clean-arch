import { ConflictError } from '@/shared/domain/errors/conflict-error';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { InMemorySearchableRepository } from '@/shared/domain/repositories/in-memory-searchable.repository';

import { UserEntity } from '@/users/domain/entities/user.entity';
import { UserRepository } from '@/users/domain/repositories/user.repositoriy';

export class UserInMemoryRepository
  extends InMemorySearchableRepository<UserEntity>
  implements UserRepository.Repository
{
  sortableFields: string[] = ['name', 'createdAt'];
  async findByEmail(email: string): Promise<UserEntity> {
    const entity = this.items.find((item) => item.props.email === email);
    if (!entity) {
      throw new NotFoundError('Usuario não encontrado com esse email');
    }
    return entity;
  }

  async emailExists(email: string): Promise<void> {
    const entity = this.items.find((item) => item.props.email === email);
    if (entity) {
      throw new ConflictError('Esse email já esta em uso');
    }
  }

  protected async applyFilter(
    items: UserEntity[],
    filter: string | null,
  ): Promise<UserEntity[]> {
    if (!filter) {
      return items;
    }
    return items.filter((item) => {
      return item.props.name.toLowerCase().includes(filter.toLowerCase());
    });
  }

  protected async applySort(
    items: UserEntity[],
    sort: string | null,
    sortDir: string | null,
  ): Promise<UserEntity[]> {
    return !sort
      ? super.applySort(items, 'createdAt', 'desc')
      : super.applySort(items, sort, sortDir);
  }
}

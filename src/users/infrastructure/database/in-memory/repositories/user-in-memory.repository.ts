import { ConflictError } from '@/shared/domain/errors/conflict-error';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { InMemoryRepository } from '@/shared/domain/repositories/in-memory.repository';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { UserRepository } from '@/users/domain/repositories/user.repositoriy';

export class UserInMemoryRepository
  extends InMemoryRepository<UserEntity>
  implements UserRepository
{
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
}

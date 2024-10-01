import { UserEntity } from '@/users/domain/entities/user.entity';
import { UserRepository } from './../../../../domain/repositories/user.repositoriy';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { UserModelMapper } from '../models/user-model.mapper';
export class UserPrismaRepository implements UserRepository.Repository {
  constructor(private prisma: PrismaService) {}

  findByEmail(email: string): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }
  emailExists(email: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  sortableFields: string[];
  search(
    props: UserRepository.SearchParams,
  ): Promise<UserRepository.SearchResult> {
    throw new Error('Method not implemented.');
  }
  insert(entity: UserEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }
  update(entity: UserEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<UserEntity> {
    return this._get(id);
  }
  findAll(): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }

  protected async _get(id: string): Promise<UserEntity> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
      return UserModelMapper.toEntity(user);
    } catch (error) {
      throw new NotFoundError('Usuario não encontrado');
    }
  }
}

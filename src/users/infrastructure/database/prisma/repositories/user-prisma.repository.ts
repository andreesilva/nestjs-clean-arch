import { UserEntity } from '@/users/domain/entities/user.entity';
import { UserRepository } from './../../../../domain/repositories/user.repositoriy';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { UserModelMapper } from '../models/user-model.mapper';
import { ConflictError } from '@/shared/domain/errors/conflict-error';
export class UserPrismaRepository implements UserRepository.Repository {
  sortableFields: string[] = ['name', 'createdAt'];

  constructor(private prismaService: PrismaService) {}

  async findByEmail(email: string): Promise<UserEntity> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email },
      });
      return UserModelMapper.toEntity(user);
    } catch (error) {
      throw new NotFoundError('Usuario não encontrado');
    }
  }
  async emailExists(email: string): Promise<void> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (user) {
      throw new ConflictError('Esse email já está em uso');
    }
  }

  async search(
    props: UserRepository.SearchParams,
  ): Promise<UserRepository.SearchResult> {
    const sortable = this.sortableFields.includes(props.sort) || false;
    const orderByField = sortable ? props.sort : 'createdAt';
    const orderByDir = sortable ? props.sortDir : 'desc';

    const count = await this.prismaService.user.count({
      ...(props.filter && {
        where: {
          name: {
            contains: props.filter,
            mode: 'insensitive',
          },
        },
        orderBy: {
          [orderByField]: orderByDir,
        },
        skip:
          props.page && props.page > 0 ? (props.page - 1) * props.perPage : 1,
        take: props.perPage && props.perPage > 0 ? props.perPage : 15,
      }),
    });

    const models = this.prismaService.user.findMany({
      ...(props.filter && {
        where: {
          name: {
            contains: props.filter,
            mode: 'insensitive',
          },
        },
      }),
    });

    return new UserRepository.SearchResult({
      items: (await models).map((model) => UserModelMapper.toEntity(model)),
      total: count,
      currentPage: props.page,
      perPage: props.perPage,
      sort: orderByField,
      sortDir: orderByDir,
      filter: props.filter,
    });
  }
  async insert(entity: UserEntity): Promise<void> {
    await this.prismaService.user.create({
      data: entity,
    });
  }
  async update(entity: UserEntity): Promise<void> {
    await this._get(entity._id);

    await this.prismaService.user.update({
      data: entity.toJSON,
      where: { id: entity._id },
    });
  }
  async delete(id: string): Promise<void> {
    await this._get(id);
    await this.prismaService.user.delete({
      where: { id },
    });
  }
  findById(id: string): Promise<UserEntity> {
    return this._get(id);
  }
  findAll(): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }

  protected async _get(id: string): Promise<UserEntity> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id },
      });
      return UserModelMapper.toEntity(user);
    } catch (error) {
      throw new NotFoundError('Usuario não encontrado');
    }
  }
}

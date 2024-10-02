import { SortDirection } from '@/shared/domain/repositories/seachable-repository-contract';
import { ListUsersUseCase } from '@/users/application/usecases/list-users.usecase';
import { IsOptional } from 'class-validator';

export class ListUsersDto implements ListUsersUseCase.Input {
  @IsOptional()
  page: number;

  @IsOptional()
  perPage: number;

  @IsOptional()
  sortDir?: SortDirection;

  @IsOptional()
  filter?: string;

  @IsOptional()
  sort?: string;
}

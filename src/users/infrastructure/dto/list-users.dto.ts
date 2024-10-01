import { SortDirection } from '@/shared/domain/repositories/seachable-repository-contract';
import { ListUsersUseCase } from '@/users/application/usecases/list-users.usecase';

export class ListUsersDto implements ListUsersUseCase.Input {
  page: number;
  perPage: number;
  sortDir?: SortDirection;
  filter?: string;
  sort?: string;
}

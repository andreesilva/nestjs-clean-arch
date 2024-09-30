import { PaginationOutputMapper } from './../../../shared/application/dto/pagination-output';
import { SearchInput } from './../../../shared/application/dto/search-input';

import { UserRepository } from '@/users/domain/repositories/user.repositoriy';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';

import { PaginationOutput } from '@/shared/application/dto/pagination-output';
import { UserOutput } from '../dto/user-output';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ListUsersUseCase {
  export type Input = SearchInput;

  export type Output = PaginationOutput<UserOutput>;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository.Repository) {}

    async execute(Input): Promise<Output> {
      const params = new UserRepository.SearchParams(Input);

      const searchResult = await this.userRepository.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(searchInput: UserRepository.SearchResult): Output {
      const items = searchInput.items.map((item) => {
        return UserOutputMapper.toOutput(item);
      });

      return PaginationOutputMapper.toOutput(items, searchInput);
    }
  }
}

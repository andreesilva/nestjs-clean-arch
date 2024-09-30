import {
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from './../../../shared/domain/repositories/seachable-repository-contract';
import { UserEntity } from '../entities/user.entity';
import { SearchRepositoryInterface } from '@/shared/domain/repositories/seachable-repository-contract';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace UserRepository {
  export type Filter = string;
  export class SearchParams extends DefaultSearchParams<Filter> {}
  export class SearchResult extends DefaultSearchResult<UserEntity, Filter> {}
  export interface Repository
    extends SearchRepositoryInterface<
      UserEntity,
      Filter,
      SearchParams,
      SearchResult
    > {
    findByEmail(email: string): Promise<UserEntity>;
    emailExists(email: string): Promise<void>;
  }
}

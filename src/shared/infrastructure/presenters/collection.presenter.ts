import { Exclude, Expose } from 'class-transformer';
import { PaginationPresenter } from './pagination.presenter';

export abstract class CollectionPresenter {
  @Exclude()
  protected paginationPresenter: PaginationPresenter;

  constructor(props: PaginationPresenter) {
    this.paginationPresenter = new PaginationPresenter(props);
  }

  @Expose()
  get meta() {
    return this.paginationPresenter;
  }

  abstract get data();
}

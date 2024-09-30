import { UserEntity } from '../entities/user.entity';
import { SearchRepositoryInterface } from '@/shared/domain/repositories/seachable-repository-contract';

export interface UserRepository
  extends SearchRepositoryInterface<UserEntity, any, any> {
  findByEmail(email: string): Promise<UserEntity>;
  emailExists(email: string): Promise<void>;
}

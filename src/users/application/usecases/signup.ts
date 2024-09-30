import { BadRequestError } from '@/shared/errors/bad-request-error';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { UserRepository } from '@/users/domain/repositories/user.repositoriy';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace SignupUseCase {
  export type Input = {
    name: string;
    email: string;
    password: string;
  };

  export type Output = {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
  };

  export class UseCase {
    constructor(private userRepository: UserRepository.Repository) {}

    async execute(Input): Promise<Output> {
      const { name, email, password } = Input;

      if (!name || !email || !password) {
        throw new BadRequestError('Exite campos vazios');
      }

      await this.userRepository.emailExists(email);

      const entity = new UserEntity(Input);

      await this.userRepository.insert(entity);

      return entity.toJSON();
    }
  }
}

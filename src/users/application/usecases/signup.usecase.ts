import { HashProvider } from '@/shared/application/providers/hash-provider';
import { BadRequestError } from '@/shared/errors/bad-request-error';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { UserRepository } from '@/users/domain/repositories/user.repositoriy';
import { UserOutput } from '../dto/user-output';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace SignupUseCase {
  export type Input = {
    name: string;
    email: string;
    password: string;
  };

  export type Output = UserOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private userRepository: UserRepository.Repository,
      private hashProvider: HashProvider,
    ) {}

    async execute(Input): Promise<Output> {
      const { name, email, password } = Input;

      if (!name || !email || !password) {
        throw new BadRequestError('Exite campos vazios');
      }

      await this.userRepository.emailExists(email);

      const hashPassword = await this.hashProvider.generateHash(password);

      const entity = new UserEntity(
        Object.assign(Input, { password: hashPassword }),
      );

      await this.userRepository.insert(entity);

      return entity.toJSON();
    }
  }
}

import { UserRepository } from '@/users/domain/repositories/user.repositoriy';
import { UserOutput, UserOutputMapper } from '../dto/user-output';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';

import { InvalidPasswordError } from '@/shared/application/errors/invalid-password-error';
import { HashProvider } from '@/shared/application/providers/hash-provider';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace UpdatePasswordUseCase {
  export type Input = {
    id: string;
    password: string;
    oldPassword: string;
  };

  export type Output = UserOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private userRepository: UserRepository.Repository,
      private hashProvider: HashProvider,
    ) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.userRepository.findById(input.id);

      if (!input.password || !input.oldPassword) {
        throw new InvalidPasswordError('As senhas devem ser informadas');
      }

      const checkOldPassword = await this.hashProvider.compareHash(
        input.oldPassword,
        entity.password,
      );

      if (!checkOldPassword) {
        throw new InvalidPasswordError('A senha antiga não confere');
      }

      const hashPassword = await this.hashProvider.generateHash(input.password);

      entity.updatePassoword(hashPassword);

      await this.userRepository.update(entity);

      return UserOutputMapper.toOutput(entity);
    }
  }
}

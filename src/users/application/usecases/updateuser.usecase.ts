import { UserRepository } from '@/users/domain/repositories/user.repositoriy';
import { UserOutput, UserOutputMapper } from '../dto/user-output';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace UpdateUserUseCase {
  export type Input = {
    id: string;
    name: string;
  };

  export type Output = UserOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository.Repository) {}

    async execute(Input): Promise<Output> {
      if (!Input.name) {
        throw new BadRequestError('O nome é obrigatório');
      }

      const entity = await this.userRepository.findById(Input.id);

      entity.update(Input.name);

      await this.userRepository.update(entity);

      return UserOutputMapper.toOutput(entity);
    }
  }
}

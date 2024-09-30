import { UserRepository } from '@/users/domain/repositories/user.repositoriy';
import { UserOutput, UserOutputMapper } from '../dto/user-output';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace GetUserUseCase {
  export type Input = {
    id: string;
  };

  export type Output = UserOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository.Repository) {}

    async execute(Input): Promise<Output> {
      const entity = await this.userRepository.findById(Input.id);

      return UserOutputMapper.toOutput(entity);
    }
  }
}

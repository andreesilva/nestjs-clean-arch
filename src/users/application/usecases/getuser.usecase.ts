import { UserRepository } from '@/users/domain/repositories/user.repositoriy';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace GetUserUseCase {
  export type Input = {
    id: string;
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
      const entity = await this.userRepository.findById(Input.id);

      return entity.toJSON();
    }
  }
}

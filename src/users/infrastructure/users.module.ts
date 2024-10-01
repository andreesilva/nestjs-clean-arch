import { BcryprjsHashProvider } from './providers/has-provider/bcryptjs-hash.provider';

import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UserInMemoryRepository } from './database/in-memory/repositories/user-in-memory.repository';
import { SigninUseCase } from '../application/usecases/signin.usecase';
import { UserRepository } from '../domain/repositories/user.repositoriy';
import { HashProvider } from '@/shared/application/providers/hash-provider';
import { SignupUseCase } from '../application/usecases/signup.usecase';
import { GetUserUseCase } from '../application/usecases/get-user.usecase';
import { ListUsersUseCase } from '../application/usecases/list-users.usecase';
import { UpdateUserUseCase } from '../application/usecases/update-user.usecase';
import { UpdatePasswordUseCase } from '../application/usecases/update-password.usecase';
import { DeleteUserUseCase } from '../application/usecases/delete-user.usecase';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: 'UsersRepository',
      useClass: UserInMemoryRepository,
    },
    {
      provide: 'HashProvider',
      useClass: BcryprjsHashProvider,
    },
    {
      provide: SignupUseCase.UseCase,
      useFactory: (
        userRepository: UserRepository.Repository,
        hashProvider: HashProvider,
      ) => {
        return new SignupUseCase.UseCase(userRepository, hashProvider);
      },

      inject: ['UsersRepository', 'HashProvider'],
    },

    {
      provide: SigninUseCase.UseCase,
      useFactory: (
        userRepository: UserRepository.Repository,
        hashProvider: HashProvider,
      ) => {
        return new SigninUseCase.UseCase(userRepository, hashProvider);
      },

      inject: ['UsersRepository', 'HashProvider'],
    },

    {
      provide: GetUserUseCase.UseCase,
      useFactory: (userRepository: UserRepository.Repository) => {
        return new GetUserUseCase.UseCase(userRepository);
      },

      inject: ['UsersRepository'],
    },
    {
      provide: ListUsersUseCase.UseCase,
      useFactory: (userRepository: UserRepository.Repository) => {
        return new ListUsersUseCase.UseCase(userRepository);
      },

      inject: ['UsersRepository'],
    },
    {
      provide: UpdateUserUseCase.UseCase,
      useFactory: (userRepository: UserRepository.Repository) => {
        return new UpdateUserUseCase.UseCase(userRepository);
      },

      inject: ['UsersRepository'],
    },
    {
      provide: UpdatePasswordUseCase.UseCase,
      useFactory: (
        userRepository: UserRepository.Repository,
        hashProvider: HashProvider,
      ) => {
        return new UpdatePasswordUseCase.UseCase(userRepository, hashProvider);
      },

      inject: ['UsersRepository', 'HashProvider'],
    },
    {
      provide: DeleteUserUseCase.UseCase,
      useFactory: (userRepository: UserRepository.Repository) => {
        return new DeleteUserUseCase.UseCase(userRepository);
      },

      inject: ['UsersRepository'],
    },
  ],
})
export class UsersModule {}

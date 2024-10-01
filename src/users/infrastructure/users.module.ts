import { BcryprjsHashProvider } from './providers/has-provider/bcryptjs-hash.provider';

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserInMemoryRepository } from './database/in-memory/repositories/user-in-memory.repository';
import { SigninUseCase } from '../application/usecases/signin.usecase';
import { UserRepository } from '../domain/repositories/user.repositoriy';
import { HashProvider } from '@/shared/application/providers/hash-provider';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'UsersRepository',
      useClass: UserInMemoryRepository,
    },
    {
      provide: 'HashProvider',
      useClass: BcryprjsHashProvider,
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
  ],
})
export class UsersModule {}

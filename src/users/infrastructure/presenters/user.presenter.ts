import { CollectionPresenter } from '@/shared/infrastructure/presenters/collection.presenter';
import { UserOutput } from '@/users/application/dto/user-output';
import { ListUsersUseCase } from '@/users/application/usecases/list-users.usecase';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserPresenter {
  @ApiProperty({
    description: 'Identificador do usuário',
  })
  id: string;

  @ApiProperty({
    description: 'Nome do usuario',
  })
  name: string;

  @ApiProperty({
    description: 'Email do usuário',
  })
  email: string;

  @ApiProperty({
    description: 'Data de criação do usuário',
  })
  @Transform(({ value }) => value.toISOString())
  createdAt: Date;

  constructor(output: UserOutput) {
    this.id = output.id;
    this.name = output.name;
    this.email = output.email;
    this.createdAt = output.createdAt;
  }
}

export class UserCollectionPresenter extends CollectionPresenter {
  data: UserPresenter[];

  constructor(output: ListUsersUseCase.Output) {
    const { items, ...paginationProps } = output;
    super(output);
    this.data = items.map((item) => new UserPresenter(item));
  }
}

import { SortDirection } from '@/shared/domain/repositories/seachable-repository-contract';
import { ListUsersUseCase } from '@/users/application/usecases/list-users.usecase';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ListUsersDto implements ListUsersUseCase.Input {
  @ApiPropertyOptional({
    description: 'Página que será retornada',
  })
  @IsOptional()
  page: number;

  @ApiPropertyOptional({
    description: 'Quatidade de registros por página',
  })
  @IsOptional()
  perPage: number;

  @ApiPropertyOptional({
    description: 'Ordenação dos dados: "crescente" ou "descrescente"',
  })
  @IsOptional()
  sortDir?: SortDirection;

  @ApiPropertyOptional({
    description: 'Dado informado para filtrar o resultado',
  })
  @IsOptional()
  filter?: string;

  @ApiPropertyOptional({
    description: 'Coluna definida para ordenar os dados: "name" ou "createdAt"',
  })
  @IsOptional()
  sort?: string;
}

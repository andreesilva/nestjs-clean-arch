import { UpdatePasswordUseCase } from '@/users/application/usecases/update-password.usecase';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto
  implements Omit<UpdatePasswordUseCase.Input, 'id'>
{
  @ApiProperty({
    description: 'Nova senha do usuário',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Senha atual do usuário',
  })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;
}

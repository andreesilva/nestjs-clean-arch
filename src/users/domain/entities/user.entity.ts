import { Entity } from '@/shared/domain/entities/entity';
//O correto é não exportar nenhuma biblioteca de terceiros para dentro da camada de dominio.
//A exportação da bibliote uuid que está em shared/domain/entities/entity.ts, foi feita devidda por causa da geração do id do usuario

export type UserProps = {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
};

export class UserEntity extends Entity<UserProps> {
  constructor(
    public readonly props: UserProps,
    id?: string,
  ) {
    super(props, id);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}

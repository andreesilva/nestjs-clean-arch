import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { EnvConfigModule } from './shared/infrastructure/env-config/env-config.module';
import { UsersModule } from './users/infrastructure/users.module';
import { DatabaseModule } from './shared/infrastructure/database/database.module';

@Module({
  imports: [ConfigModule, EnvConfigModule, UsersModule, DatabaseModule],
})
export class AppModule {}

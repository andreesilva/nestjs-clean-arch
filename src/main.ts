import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

import { applyGlobalConfig } from './global-config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const config = new DocumentBuilder()
    .setTitle('NestJs com Clear Arch')
    .setDescription(
      'Criando uma API NestJS com Arquitetura Limpa, DDD, e automação de testes',
    )
    .setVersion('1.0')
    .addBearerAuth({
      description: 'Informar o token JWT para autenticar',
      name: 'authorization',
      scheme: 'bearer',
      type: 'http',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  applyGlobalConfig(app);
  await app.listen(3000, '0.0.0.0');
}
bootstrap();

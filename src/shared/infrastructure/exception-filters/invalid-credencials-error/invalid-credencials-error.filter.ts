import { InvalidCredencialsError } from '@/shared/application/errors/invalid-credencials-error';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Catch(InvalidCredencialsError)
export class InvalidCredencialsErrorFilter implements ExceptionFilter {
  catch(exception: InvalidCredencialsError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    response.status(400).send({
      statusCode: 400,
      message: exception.message,
      error: 'Bad Request',
    });
  }
}

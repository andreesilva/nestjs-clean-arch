import { ConflictError } from '@/shared/domain/errors/conflict-error';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Catch()
export class ConflictErrorFilter implements ExceptionFilter {
  catch(exception: ConflictError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    response.status(409).send({
      statusCode: 409,
      message: exception.message,
      error: 'Conflict',
    });
  }
}

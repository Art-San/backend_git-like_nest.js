import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()
		const request = ctx.getRequest<Request>()
		const status =
			exception instanceof HttpException ? exception.getStatus() : 500

		response.status(status).json({
			statusCode: status,
			timestamp: new Date().toISOString(),
			path: request.url,
		})
	}
}

// регистрация глобально
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { AllExceptionsFilter } from './all-exceptions.filter';

// async function bootstrap() {
//  const app = await NestFactory.create(AppModule);
//  app.useGlobalFilters(new AllExceptionsFilter());
//  await app.listen(3000);
// }
// bootstrap();

// или модуле
// import { Module } from '@nestjs/common';
// import { APP_FILTER } from '@nestjs/core';
// import { AllExceptionsFilter } from './all-exceptions.filter';

// @Module({
//  providers: [
//     {
//       provide: APP_FILTER,
//       useClass: AllExceptionsFilter,
//     },
//  ],
// })
// export class AppModule {}

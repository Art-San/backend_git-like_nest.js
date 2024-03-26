import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(HttpException)
export class AuthExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()
		const request = ctx.getRequest<Request>()
		const status = exception.getStatus()

		// Здесь вы можете определить логику перенаправления в случае ошибки
		if (status === 401) {
			// Пример: если статус ошибки 401 (Unauthorized)
			response.redirect('/login') // Перенаправление на страницу входа
		} else {
			response.status(status).json({
				statusCode: status,
				timestamp: new Date().toISOString(),
				path: request.url,
				massage: 'из AuthExceptionFilter',
			})
		}
	}
}

// @Module({
//  // ... другие свойства модуля
//  providers: [
// 	// ... другие провайдеры
// 	{
// 	  provide: APP_FILTER,
// 	  useClass: AuthExceptionFilter,
// 	},
//  ],
// })
// export class YourModule {}

// import { Controller, Get, UseGuards, UseFilters } from '@nestjs/common'
// import { AuthGuard } from '@nestjs/passport'
// import { AuthExceptionFilter } from '../filters/auth-exception.filter'

// @Controller('auth')
// @UseFilters(AuthExceptionFilter) // Применяем фильтр исключений к контроллеру
// export class AuthController {
// 	@Get('github')
// 	@UseGuards(AuthGuard('github'))
// 	async githubAuth(@Req() req) {
// 		// Логика аутентификации
// 	}

// 	@Get('github/callback')
// 	@UseGuards(AuthGuard('github'))
// 	async githubAuthRedirect(@Req() req, @Res() res) {
// 		// Логика обработки ответа от GitHub
// 		// Если аутентификация прошла успешно, перенаправление на главную страницу
// 		res.redirect('/')
// 	}
// }

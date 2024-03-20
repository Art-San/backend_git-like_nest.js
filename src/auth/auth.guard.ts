import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class AuthGuard implements CanActivate {
	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest()
		console.log(1, 'request', request)
		if (request.isAuthenticated()) {
			return true
		} else {
			// Перенаправление на главную страниц
			const response = context.switchToHttp().getResponse()
			response.redirect('http://localhost:3000')
			return false
		}
	}
}
// // import { CookieService } from './cookie.service'
// import {
// 	CanActivate,
// 	ExecutionContext,
// 	Injectable,
// 	UnauthorizedException,
// } from '@nestjs/common'
// import { Observable } from 'rxjs'
// import { Request, response } from 'express'
// // import { JwtService } from '@nestjs/jwt'
// import { ConfigService } from '@nestjs/config'

// const configService = new ConfigService()

// @Injectable()
// export class AuthGuard implements CanActivate {
// 	// constructor(private jwtService: JwtService) {}

// 	canActivate(context: ExecutionContext) {
// 		const req = context.switchToHttp().getRequest() as Request // Достаем токен
// 		const token = false
// 		// const token = req.cookies[CookieService.tokenKey]

// 		if (!token) {
// 			throw new UnauthorizedException({ message: 'нет токена в куках' })
// 		}

// 		try {
// 			// const sessionInfo = this.jwtService.verifyAsync(token, {
// 			// 	secret: configService.get('JWT_SECRET'),
// 			// })
// 			//const sessionInfo = this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET })
// 			// req['session'] = sessionInfo //в req в поле 'session' записываем информацию о текущей сессии
// 			// получим в session-info.decorator.ts данные из session
// 		} catch {
// 			throw new UnauthorizedException({ message: 'ошибка AuthGuard' })
// 		}
// 		return true
// 	}
// }

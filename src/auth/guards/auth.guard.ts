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

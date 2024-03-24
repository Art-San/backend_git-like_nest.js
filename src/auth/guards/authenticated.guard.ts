import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

@Injectable()
export class AuthenticatedGuard implements CanActivate {
	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest()
		console.log(1, 'AuthenticatedGuard request', request.isAuthenticated())
		return request.isAuthenticated()
	}
}

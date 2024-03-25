import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private configService: ConfigService) {}
	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest()
		if (request.isAuthenticated()) {
			return true
		} else {
			const response = context.switchToHttp().getResponse()
			response.redirect(this.configService.get('CLIENT_BASE_URL') + '/login')
			// response.redirect(`${process.env.CLIENT_BASE_URL}/login`)
			return false
		}
	}
}

import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
@Injectable()
export class GitAuthGuard extends AuthGuard('github') {
	async canActivate(context: ExecutionContext) {
		const result = (await super.canActivate(context)) as boolean
		const request = context.switchToHttp().getRequest()
		await super.logIn(request)
		return result
	}
}

// import { ExecutionContext, Injectable } from '@nestjs/common'
// import { AuthGuard } from '@nestjs/passport'
// @Injectable()
// export class LocalAuthGuard extends AuthGuard('local') {
// 	async canActivate(context: ExecutionContext) {
// 		const result = (await super.canActivate(context)) as boolean
// 		const request = context.switchToHttp().getRequest()
// 		await super.logIn(request)
// 		return result
// 	}
// }

// https://github.com/nestjs/nest/issues/1365

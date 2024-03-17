// auth.controller.ts
import { Controller, Get, UseGuards, Req } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	@Get('github')
	@UseGuards(AuthGuard('github'))
	async githubAuth(@Req() req) {}

	@Get('github/callback')
	@UseGuards(AuthGuard('github'))
	async githubAuthRedirect(@Req() req) {
		// console.log('req', req.user)

		return this.authService.register(req.user)
		// return req.user
	}
}

// auth.controller.ts
import { Controller, Get, UseGuards, Req } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Controller('auth')
export class AuthController {
	@Get('github')
	@UseGuards(AuthGuard('github'))
	async githubAuth(@Req() req) {}

	@Get('github/callback')
	@UseGuards(AuthGuard('github'))
	async githubAuthRedirect(@Req() req) {
		console.log('req', req.user)
		// Здесь вы можете обработать успешно аутентифицированного пользователя
		return req.user
	}
}

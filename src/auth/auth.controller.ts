// auth.controller.ts
import { Controller, Get, UseGuards, Req, Res, Request } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { ApiOkResponse } from '@nestjs/swagger'
import { Response } from 'express'
import { AuthenticatedGuard } from './guards/authenticated.guard'
import { GitAuthGuard } from './guards/git.guard'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	// http://localhost:3000/github
	@Get('github')
	@UseGuards(AuthGuard('github'))
	async githubAuth(@Req() req) {}

	@Get('github/callback')
	@UseGuards(GitAuthGuard)
	async githubAuthRedirect(
		@Req() req,
		@Res({ passthrough: true }) res: Response // passthrough: true Обязательная штука
	) {
		return res.redirect('/')
	}

	// http://localhost:5000/api/auth/check
	@Get('check')
	@ApiOkResponse()
	async check(@Req() req, @Res({ passthrough: true }) res: Response) {
		return this.authService.check(req)
	}

	// http://localhost:5000/api/auth/logout
	@Get('logout')
	@ApiOkResponse()
	async logout(@Req() req, @Res({ passthrough: true }) res: Response) {
		// req.session.destroy((err) => {})
		// return { message: 'Logged out' }
		return this.authService.logout(req)
	}

	// http://localhost:5000/api/auth/protected
	@UseGuards(AuthenticatedGuard)
	@Get('/protected')
	getHello(@Request() req): string {
		return req.user
	}

	// @Get('session')
	// // http://localhost:3000/api/auth/session
	// findAll(@Session() session: Record<string, any>) {
	// 	session.visits = session.visits ? session.visits + 1 : 4
	// 	console.log(session.visits)
	// 	return session.visits
	// }
}

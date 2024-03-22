// auth.controller.ts
import { Controller, Get, UseGuards, Req, Res, Request } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { ApiOkResponse } from '@nestjs/swagger'
import { Response } from 'express'
import { AuthenticatedGuard } from './guards/authenticated.guard'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	// passport.authenticate
	@Get('github')
	@UseGuards(AuthGuard('github'))
	async githubAuth(@Req() req) {}

	@Get('github/callback')
	@UseGuards(AuthGuard('github'))
	async githubAuthRedirect(
		@Req() req,
		@Res({ passthrough: true }) res: Response // passthrough: true Обязательная штука
	) {
		console.log(1, await req.isAuthenticated()) // true
		console.log(2, req.session) //  cookie: { path: '/', _expires: null, originalMaxAge: null, httpOnly: true }
		console.log(3, req.user) // {true}

		return res.redirect('/')
	}

	@Get('check')
	@ApiOkResponse()
	async check(@Req() req, @Res({ passthrough: true }) res: Response) {
		console.log(4, await req.isAuthenticated()) // false
		console.log(5, req.session) // { path: '/', _expires: null, originalMaxAge: null, httpOnly: true }
		console.log(6, req.user) // undefined
		return this.authService.check(req)
	}

	@Get('logout')
	@ApiOkResponse()
	async logout(@Req() req, @Res({ passthrough: true }) res: Response) {
		// const result = this.authService.logout(req, res)
	}

	// api/auth/protected
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

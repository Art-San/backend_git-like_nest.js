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

	// passport.authenticate
	@Get('github')
	@UseGuards(AuthGuard('github'))
	async githubAuth(@Req() req) {}

	@Get('github/callback')
	@UseGuards(GitAuthGuard)
	// @UseGuards(AuthGuard('github'))
	async githubAuthRedirect(
		@Req() req,
		@Res({ passthrough: true }) res: Response // passthrough: true Обязательная штука
	) {
		// console.log(1, req.isAuthenticated()) // true
		// console.log(2, req.session)
		// 2 Session {
		// 	cookie: { path: '/', _expires: null, originalMaxAge: null, httpOnly: true }
		//   }
		// console.log(3, req.user) // {true}
		// 3 {
		// 	_id: new ObjectId('65fd882ce114622800cd28e1'),
		// 	username: 'Art-San',
		// 	name: 'Aleksandr A',
		// 	profileUrl: 'https://github.com/Art-San',
		// 	avatarUrl: 'https://avatars.githubusercontent.com/u/103478300?v=4',
		// 	email: 'artsan.mcc@gmail.com',
		// 	likedProfiles: [],
		// 	likedBy: [],
		// 	createdAt: 2024-03-22T13:31:24.146Z,
		// 	updatedAt: 2024-03-22T13:31:24.146Z,
		// 	__v: 0
		//   }

		return res.redirect('/')
	}

	@Get('check')
	@ApiOkResponse()
	async check(@Req() req, @Res({ passthrough: true }) res: Response) {
		console.log(4, req.isAuthenticated()) // false
		console.log(5, req.session)
		// 2 Session {
		// 	cookie: { path: '/', _expires: null, originalMaxAge: null, httpOnly: true }
		//   }
		// console.log(6, req.user) // undefined
		return this.authService.check(req)
	}

	// api/auth/logout
	@Get('logout')
	@ApiOkResponse()
	async logout(@Req() req, @Res({ passthrough: true }) res: Response) {
		// console.log(0, 'logout')
		console.log(1, req.isAuthenticated()) //  false
		console.log(2, req.session) //  также как и выше
		// console.log(3, req.user) //  false
		req.session.destroy((err) => {
			console.log(4, req.session) // 4 undefined

			return { message: 'Logged out' }
		})
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

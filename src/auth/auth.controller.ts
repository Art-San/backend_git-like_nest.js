// auth.controller.ts
import {
	Controller,
	Get,
	UseGuards,
	Req,
	Post,
	Body,
	Param,
	Res,
	Session,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { AuthDto, loginDto } from './dto/auth.dto'
import { ApiOkResponse } from '@nestjs/swagger'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('github')
	@UseGuards(AuthGuard('github'))
	async githubAuth(@Req() req) {}

	@Get('github/callback')
	@UseGuards(AuthGuard('github'))
	async githubAuthRedirect(
		@Req() req,
		@Res({ passthrough: true }) res: Response // passthrough: true Обязательная штука
	) {
		console.log(1, 'github/callback', req)
		const result = await this.authService.register(req.user, res)

		/*TODO: ТУТ порядок надо делать*/
		if (result) {
			res.redirect('/test')
		} else {
			res.redirect('/test1')
		}
	}

	@Get('check')
	@ApiOkResponse()
	async check(@Req() req, @Res({ passthrough: true }) res: Response) {
		console.log(2, 'check req.user', req.user)
		return this.authService.check(req, res)
	}

	@Get('logout')
	@ApiOkResponse()
	async logout(@Req() req, @Res({ passthrough: true }) res: Response) {
		// const result = this.authService.logout(req, res)
	}

	@Get('session')
	findAll(@Session() session: Record<string, any>) {
		session.visits = session.visits ? session.visits + 1 : 4
		console.log(session.visits)
		return session.visits
	}
}

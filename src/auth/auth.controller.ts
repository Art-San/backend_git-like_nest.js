// auth.controller.ts
import {
	Controller,
	Get,
	UseGuards,
	Req,
	Res,
	Request,
	Session,
	UseFilters,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { ApiOkResponse } from '@nestjs/swagger'
import { Response } from 'express'
import { AuthenticatedGuard } from './guards/authenticated.guard'
import { GitAuthGuard } from './guards/git.guard'
import { AuthExceptionFilter } from 'src/filters/auth-exception.filter'

@Controller('auth')
@UseFilters(AuthExceptionFilter)
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	// http://localhost:3000/github
	@Get('/github')
	@UseGuards(AuthGuard('github'))
	async githubAuth(@Req() req) {}

	@Get('/github/callback')
	@UseGuards(GitAuthGuard)
	async githubAuthRedirect(
		@Req() req,
		@Res({ passthrough: true }) res: Response // passthrough: true Обязательная штука
	) {
		return res.redirect('/')
	}

	// http://localhost:5000/api/auth/check
	@Get('/check')
	@ApiOkResponse()
	async check(@Req() req, @Res({ passthrough: true }) res: Response) {
		return this.authService.check(req)
	}

	// http://localhost:5000/api/auth/logout
	@Get('/logout')
	@ApiOkResponse()
	async logout(@Req() req, @Res({ passthrough: true }) res: Response) {
		return this.authService.logout(req)
	}
}

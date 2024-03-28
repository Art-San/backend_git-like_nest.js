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
	HttpStatus,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'
import {
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger'
import { Response } from 'express'
import { AuthenticatedGuard } from './guards/authenticated.guard'
import { GitAuthGuard } from './guards/git.guard'
import { AuthExceptionFilter } from 'src/filters/auth-exception.filter'

@ApiTags('Auth')
@Controller('auth')
@UseFilters(AuthExceptionFilter)
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	//====================================================================

	// http://localhost:3000/github
	@UseGuards(AuthGuard('github'))
	@Get('/github')
	@ApiResponse({
		description: 'Перенаправляет на страницу входа в GitHub',
		status: HttpStatus.TEMPORARY_REDIRECT,
	})
	@ApiNotFoundResponse({
		description: 'OAuth2 не включен для GitHub',
	})
	async githubAuth(@Req() req) {}

	//====================================================================

	@UseGuards(GitAuthGuard)
	@Get('/github/callback')
	@ApiResponse({
		description: 'Перенаправление на внешний интерфейс с помощью токена JWT',
		status: HttpStatus.PERMANENT_REDIRECT,
	})
	@ApiNotFoundResponse({
		description: 'OAuth2 не включен для GitHub',
	})
	async githubAuthRedirect(
		@Req() req,
		@Res({ passthrough: true }) res: Response // passthrough: true Обязательная штука
	) {
		return res.redirect('/')
	}

	//====================================================================

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

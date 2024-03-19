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
		const result = await this.authService.register(req.user, res)
		/*TODO: ТУТ порядок надо делать*/
		if (result) {
			res.redirect('/')
		} else {
			res.redirect('/test1')
		}
	}

	@Post('/login')
	@ApiOkResponse({ type: AuthDto })
	async login(
		@Body() body: loginDto,
		@Res({ passthrough: true }) res: Response // passthrough: true Обязательная штука
	) {
		return this.authService.login(body)
	}
}

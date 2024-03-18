// auth.controller.ts
import {
	Controller,
	Get,
	UseGuards,
	Req,
	Post,
	Body,
	Param,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	@Get('github')
	@UseGuards(AuthGuard('github'))
	async githubAuth(@Req() req) {
		// console.log(1, 'req', req.user)
	}

	@Get('github/callback')
	@UseGuards(AuthGuard('github'))
	async githubAuthRedirect(@Req() req) {
		console.log(2, 'req', req.user)

		return this.authService.register(req.user)
		// return req.user
	}

	@Get('/login')
	async login(@Body() dto: AuthDto) {
		console.log(1, dto)
		return dto
		// return this.authService.login(dto)
	}

	@Get('/test/:test')
	getHello(@Param('test') test: string) {
		return this.authService.getHello(test)
	}
}

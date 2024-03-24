import {
	Controller,
	Get,
	Post,
	Param,
	Req,
	Res,
	UseGuards,
} from '@nestjs/common'
import { ApiOkResponse, ApiProperty } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { UserProfileResponseDto } from './dto/account.dto'

import { AuthGuard } from 'src/auth/guards/auth.guard'
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}
	@Get('/profile/:username')
	@ApiOkResponse({ type: UserProfileResponseDto })
	getProfile(@Param('username') username: string) {
		return this.usersService.getProfile(username)
	}

	@Post('/like/:username')
	@ApiOkResponse({ type: UserProfileResponseDto })
	likeProfile(
		@Req() req,
		@Res({ passthrough: true }) res: Response // passthrough: true Обязательная штук
	) {
		return this.usersService.likeProfile(req, res)
	}

	// http://localhost:5000/api/users/test
	// @UseGuards(AuthenticatedGuard)
	@UseGuards(AuthGuard)
	@Get('/test')
	getProtectedResource() {
		return { message: 'Это защищенный ресурс' }
	}
	// http://localhost:5000/api/users/likes
	@UseGuards(AuthGuard)
	@Get('/likes')
	@ApiOkResponse({ type: UserProfileResponseDto })
	getLikes(@Req() req) {
		return this.usersService.getProfile(req)
	}
}

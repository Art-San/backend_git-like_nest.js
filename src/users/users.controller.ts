import { Controller, Get, Post, Param, Body, Req, Res } from '@nestjs/common'
import { ApiOkResponse, ApiProperty } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { UserProfileResponseDto } from './dto/account.dto'
import { AuthDto } from 'src/auth/dto/auth.dto'

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
		@Res({ passthrough: true }) res: Response // passthrough: true Обязательная штука
	) {
		return this.usersService.likeProfile(req, res)
	}

	// @Get('/likes')
	// @ApiOkResponse({ type: UserProfileResponseDto })
	// getLikes(@Req() req) {
	// 	return this.usersService.getProfile(req)
	// }
}

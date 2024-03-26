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

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get('/profile/:username')
	@ApiOkResponse({ type: UserProfileResponseDto })
	getProfile(@Param('username') username: string) {
		return this.usersService.getUserProfileAndRepos(username)
	}

	// http://localhost:5000/api/users/like/dar
	@UseGuards(AuthGuard)
	@Post('/like/:username')
	@ApiOkResponse({ type: UserProfileResponseDto })
	likeProfile(@Param('username') username: string, @Req() req) {
		return this.usersService.likeProfile(username, req)
	}

	// http://localhost:3000/likes
	// http://localhost:5000/api/users/likes
	@UseGuards(AuthGuard)
	@Get('/likes')
	@ApiOkResponse({ type: UserProfileResponseDto })
	getLikes(@Req() req, @Res({ passthrough: true }) res: Response) {
		return this.usersService.getLikes(req)
	}
}

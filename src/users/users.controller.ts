import { Controller, Get, Param } from '@nestjs/common'
import { ApiOkResponse, ApiProperty } from '@nestjs/swagger'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}
	@Get('/profile/:username')
	@ApiOkResponse()
	getProfile(@Param('username') username: string) {
		return this.usersService.getProfile(username)
	}
}

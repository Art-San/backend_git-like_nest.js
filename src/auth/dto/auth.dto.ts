import { IsString } from 'class-validator'

export interface ILogin {
	email: string
}

export class AuthDto {
	@IsString()
	name: string

	@IsString()
	username: string

	@IsString()
	email: string

	@IsString()
	profileUrl: string

	@IsString()
	avatarUrl: string

	likedProfiles: any[]

	likedBy: any[]
}

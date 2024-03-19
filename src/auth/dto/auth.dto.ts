import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export interface ILogin {
	email: string
	password: string
}

export class loginDto {
	@ApiProperty({
		example: 'artsan.mcc@gmail.com',
	})
	@IsEmail()
	email: string

	@ApiProperty({
		example: '12345',
	})
	@IsNotEmpty()
	password: string
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

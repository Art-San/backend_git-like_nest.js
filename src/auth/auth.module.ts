// auth.module.ts
import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { GithubStrategy } from './passport/github.strategy'
import { TypegooseModule } from 'nestjs-typegoose'
import { UserModel } from 'src/users/users.model'
import { ConfigModule } from '@nestjs/config'

@Module({
	controllers: [AuthController],
	imports: [
		PassportModule,
		TypegooseModule.forFeature([
			{
				typegooseClass: UserModel,
				schemaOptions: {
					collection: 'User',
				},
			},
		]),
		ConfigModule,
	],
	providers: [AuthService, GithubStrategy],
})
export class AuthModule {}

// auth.module.ts
import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { GithubStrategy } from './passport/github.strategy'
import { TypegooseModule } from '@m8a/nestjs-typegoose'

import { ConfigModule } from '@nestjs/config'
import { AuthModel } from './auth.model'

@Module({
	controllers: [AuthController],
	imports: [
		PassportModule,
		TypegooseModule.forFeature([
			{
				typegooseClass: AuthModel,
				schemaOptions: {
					collection: 'Users',
				},
			},
		]),
		ConfigModule,
	],
	providers: [AuthService, GithubStrategy],
})
export class AuthModule {}

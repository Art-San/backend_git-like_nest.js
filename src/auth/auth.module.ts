// auth.module.ts
import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { GithubStrategy } from './passport/github.strategy'
import { ConfigModule } from '@nestjs/config'
import { UserModel } from 'src/users/model/users.model'
import { TypegooseModule } from '@m8a/nestjs-typegoose'
import { SessionSerializer } from './passport/session.serializer'

@Module({
	controllers: [AuthController],
	imports: [
		// PassportModule.register({
		// 	session: true,
		// }),
		TypegooseModule.forFeature([
			{
				typegooseClass: UserModel,
				schemaOptions: {
					collection: 'Users',
				},
			},
		]),
		ConfigModule,
	],
	providers: [AuthService, GithubStrategy, SessionSerializer],
})
export class AuthModule {}

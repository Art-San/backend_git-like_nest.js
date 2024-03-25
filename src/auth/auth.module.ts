import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { GithubStrategy } from './passport/github.strategy'
import { ConfigModule } from '@nestjs/config'
import { UserModel } from 'src/users/model/users.model'
import { TypegooseModule } from '@m8a/nestjs-typegoose'
import { SessionSerializer } from './passport/session.serializer'

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: UserModel,
				schemaOptions: {
					collection: 'users',
				},
			},
		]),
		ConfigModule,
	],

	providers: [AuthService, GithubStrategy, SessionSerializer],
	controllers: [AuthController],
})
export class AuthModule {}

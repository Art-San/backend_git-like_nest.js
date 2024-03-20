// users.module.ts
import { Module } from '@nestjs/common'
import { TypegooseModule } from '@m8a/nestjs-typegoose'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { UserModel } from './users.model'
import { AuthGuard } from 'src/auth/auth.guard'
// import { AuthGuard } from 'src/auth/auth.guard'

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: UserModel,
				schemaOptions: {
					collection: 'User',
				},
			},
		]),
	],
	providers: [UsersService, AuthGuard],
	controllers: [UsersController],
	exports: [UsersService], // Если UsersService нужно экспортировать для использования в других модулях
})
export class UsersModule {}

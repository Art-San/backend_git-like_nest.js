// users.module.ts
import { Module } from '@nestjs/common'
import { TypegooseModule } from '@m8a/nestjs-typegoose'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'

import { AuthGuard } from 'src/auth/guards/auth.guard'
import { UserModel } from './model/users.model'

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: UserModel,
				schemaOptions: {
					collection: 'Users',
				},
			},
		]),
	],
	providers: [UsersService, AuthGuard],
	controllers: [UsersController],
	exports: [UsersService], // Если UsersService нужно экспортировать для использования в других модулях
})
export class UsersModule {}

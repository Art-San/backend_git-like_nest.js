// users.module.ts
import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { UserModel } from './users.model'

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
	providers: [UsersService],
	controllers: [UsersController],
	exports: [UsersService], // Если UsersService нужно экспортировать для использования в других модулях
})
export class UsersModule {}

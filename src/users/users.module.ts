import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
// import { TypegooseModule } from 'nestjs-typegoose' // RG
import { TypegooseModule } from '@m8a/nestjs-typegoose' // GPT
import { UsersModel } from './users.model'

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: UsersModel,
				schemaOptions: {
					collection: 'Users',
				},
			},
		]),
	],
	controllers: [UsersController],
	providers: [UsersService],
})
export class UsersModule {}

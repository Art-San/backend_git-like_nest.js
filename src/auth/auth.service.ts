import { Injectable } from '@nestjs/common'
import { AuthDto } from './dto/auth.dto'
import { InjectModel } from '@m8a/nestjs-typegoose'
import { UserModel } from 'src/users/users.model'
import { ModelType } from '@typegoose/typegoose/lib/types'

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>
	) {}

	async register(dto: AuthDto) {
		const oldUser = await this.userModel.findOne({ email: dto.email })
		// if (oldUser) {
		// 	return (message: 'Юзер с таким email есть уже в системе')
		// }

		// const newUser = new this.userModel({
		// 	email: dto.email,
		// 	password: await hash(dto.password, salt),
		// })
		// const user = await newUser.save()

		return { message: 'В базе user' }
	}
}

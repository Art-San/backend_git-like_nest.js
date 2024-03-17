import { Injectable } from '@nestjs/common'
import { AuthDto } from './dto/auth.dto'
import { InjectModel } from 'nestjs-typegoose'
import { UserModel } from 'src/users/users.model'
import { ModelType } from '@typegoose/typegoose/lib/types'

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>
	) {}

	async register(dto: AuthDto) {
		console.log(1, 'dto', dto.username)

		try {
			const oldUser = await this.userModel.findOne({ username: dto.username })
			console.log(2, '1oldUser', oldUser)
		} catch (error) {
			console.log(3, 'error', error.message)
			return { message: error.message }
		}
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

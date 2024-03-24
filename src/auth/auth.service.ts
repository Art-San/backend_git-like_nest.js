import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthDto, ILogin } from './dto/auth.dto'
import { InjectModel } from '@m8a/nestjs-typegoose'

import { ModelType } from '@typegoose/typegoose/lib/types'

import { Response, Request } from 'express'
import { UserModel } from 'src/users/model/users.model'

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>
	) {}

	async login(dto: ILogin): Promise<UserModel> {
		const user = await this.userModel.findOne({ email: dto.email })

		if (!user) {
			// return { message: `Нет такого юзера ${dto.email}` }
			throw new UnauthorizedException('Юзер с таким email нет в системе')
		}

		return user
		// return { message: `Привет ${user.username}` }
	}

	// async register(dto: AuthDto, res: Response) {
	// 	try {
	// 		const oldUser = await this.userModel.findOne({ username: dto.username })
	// 		if (oldUser) {
	// 			return oldUser
	// 		}
	// 		const newUser = new this.userModel({
	// 			name: dto.name,
	// 			username: dto.username,
	// 			email: dto.email,
	// 			profileUrl: dto.profileUrl,
	// 			avatarUrl: dto.avatarUrl,
	// 		})

	// 		const user = await newUser.save()

	// 		return user
	// 	} catch (error) {
	// 		throw new Error(error)
	// 	}
	// }

	async check(req: Request) {
		if (req.isAuthenticated()) {
			return { user: req.user }
		} else {
			return { user: null }
		}
	}

	logout(req: Request) {
		req.session.destroy((err) => {})
		return { message: 'Вышел из системы' }
	}
}

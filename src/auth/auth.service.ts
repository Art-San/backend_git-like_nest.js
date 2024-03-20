import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthDto, ILogin } from './dto/auth.dto'
import { InjectModel } from '@m8a/nestjs-typegoose'

import { ModelType } from '@typegoose/typegoose/lib/types'
import { AuthModel } from './auth.model'
import { Response, Request } from 'express'

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(AuthModel) private readonly authModel: ModelType<AuthModel>
	) {}

	async login(dto: ILogin): Promise<AuthModel> {
		const user = await this.authModel.findOne({ email: dto.email })

		if (!user) {
			// return { message: `Нет такого юзера ${dto.email}` }
			throw new UnauthorizedException('Юзер с таким email нет в системе')
		}

		return user
		// return { message: `Привет ${user.username}` }
	}

	async register(dto: AuthDto, res: Response) {
		try {
			const oldUser = await this.authModel.findOne({ username: dto.username })
			if (oldUser) {
				return oldUser
			}
			const newUser = new this.authModel({
				name: dto.name,
				username: dto.username,
				email: dto.email,
				profileUrl: dto.profileUrl,
				avatarUrl: dto.avatarUrl,
			})

			const user = await newUser.save()

			return user
		} catch (error) {
			throw new Error(error)
		}
	}

	check(req: Request, res: Response) {
		if (req.isAuthenticated()) {
			res.send({ user: req.user })
		} else {
			res.send({ user: null })
		}
	}

	logout(req, res: Response) {
		req.session.destroy((err) => {
			res.json({ message: 'Logged out' })
		})
	}
}

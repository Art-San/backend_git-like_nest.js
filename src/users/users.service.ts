import { InjectModel } from '@m8a/nestjs-typegoose'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UserModel } from './model/users.model'
import { ModelType } from '@typegoose/typegoose/lib/types' // RG
// import { Model } from 'mongoose'  // GPT

const configService = new ConfigService()

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(UserModel) private userModel: ModelType<UserModel>
	) {} // RG
	// constructor(@InjectModel(User) private userModel: Model<User>) {} // GPT
	async getProfile(username: string) {
		try {
			const userRes = await fetch(`https://api.github.com/users/${username}`, {
				// headers: {
				// 	authorization: configService.get<string>('GITHUB_API_KEY_30DAY'),
				// },
			})

			const userProfile = await userRes.json()

			const repoRes = await fetch(`${userProfile.repos_url}?per_page=1`, {
				// const repoRes = await fetch(userProfile.repos_url), {
				// headers: {
				// 	authorization: configService.get<string>('GITHUB_API_KEY_30DAY'),
				// },
			})
			const repos = await repoRes.json()

			return { userProfile, repos }
		} catch (error) {
			return { error: error.message }
		}
	}

	async getLikes(req: any) {
		try {
			//   const user = await User.findById(req.user._id.toString())
			//   res.status(200).json({ likedBy: user.likedBy })
			// return user
			return req.user._id
		} catch (error) {
			return { error: error.message }
		}
	}

	async likeProfile(req: any, res: any) {
		try {
			const { username } = req.params
			//   const user = await User.findById(req.user._id.toString())

			//   const userToLike = await User.findOne({ username })

			// if (!userToLike) {
			// 	return res
			// 		.status(404)
			// 		.json({ error: 'Пользователь не является участником' })
			// }

			// if (user.likedProfiles.includes(userToLike.username)) {
			// 	return res.status(400).json({ error: 'Пользователю уже понравилось' })
			// }

			// userToLike.likedBy.push({
			// 	username: user.username,
			// 	avatarUrl: user.avatarUrl,
			// 	likedDate: Date.now(),
			// })
			// user.likedProfiles.push(userToLike.username)

			// await userToLike.save();
			// await user.save();
			// await Promise.all([userToLike.save(), user.save()])

			res.status(200).json({ message: 'User liked' })
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}
}

// https://api.github.com/users/Art-San
// https://api.github.com/users/Art-San/repos?per_page=1

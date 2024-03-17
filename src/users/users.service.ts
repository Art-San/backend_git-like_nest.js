import { InjectModel } from 'nestjs-typegoose'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UserModel } from './users.model'
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
}

// https://api.github.com/users/Art-San
// https://api.github.com/users/Art-San/repos?per_page=1

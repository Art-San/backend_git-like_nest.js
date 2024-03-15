import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

const configService = new ConfigService()

@Injectable()
export class UsersService {
	async getProfile(username: string) {
		try {
			const userRes = await fetch(`https://api.github.com/users/${username}`, {
				// headers: {
				// 	authorization: configService.get<string>('GITHUB_API_KEY_30DAY'),
				// },
			})

			const userProfile = await userRes.json()

			const repoRes = await fetch(userProfile.repos_url, {
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

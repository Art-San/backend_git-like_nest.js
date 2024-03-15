import { Injectable } from '@nestjs/common'

@Injectable()
export class UsersService {
	async getProfile(username: string) {
		console.log(1, 'username', username)
		try {
			const userRes = await fetch(`https://api.github.com/users/${username}`, {
				// headers: {
				// 	authorization: `token ${process.env.GITHUB_API_KEY_30DAY}`,
				// },
			})

			const userProfile = await userRes.json()
			console.log(
				2,
				'process.env.GITHUB_API_KEY_30DAY',
				process.env.GITHUB_API_KEY_30DAY
			)

			// const repoRes = await fetch(userProfile.repos_url, {
			// 	headers: {
			// 		authorization: `token ${process.env.GITHUB_API_KEY_30DAY}`,
			// 	},
			// })
			// const repos = await repoRes.json()

			return { userProfile }
			// return { userProfile, repos }
		} catch (error) {
			return { error: error.message }
		}
	}
}

// https://api.github.com/users/Art-San

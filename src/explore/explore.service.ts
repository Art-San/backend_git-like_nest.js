import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class ExploreService {
	constructor(private readonly configService: ConfigService) {}
	async explorePopularRepos(language: string) {
		try {
			const response = await fetch(
				`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=10`,
				{
					//   headers: {
					//     authorization: `token ${process.env.GITHUB_API_KEY_30DAY}`
					//   }
				}
			)
			console.log(
				1,
				'process.env.GITHUB_API_KEY_30DAY',
				process.env.GITHUB_API_KEY_30DAY
			)
			console.log(
				1,
				'process.env.GITHUB_API_KEY_30DAY',
				this.configService.get('process.env.GITHUB_API_KEY_30DAY')
			)

			const repos = await response.json()

			return repos
		} catch (error) {
			return { error: error.message }
		}
	}
}

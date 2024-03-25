import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class ExploreService {
	constructor(private readonly configService: ConfigService) {}
	async explorePopularRepos(language: string) {
		try {
			const response = await fetch(
				`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=2`,
				{
					headers: {
						authorization: this.configService.get<string>(
							'GITHUB_API_KEY_30DAY'
						),
					},
				}
			)

			const data = await response.json()

			return { repos: data.items }
		} catch (error) {
			return { error: error.message }
		}
	}
}

import { Controller, Param, Get } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'
import { ExploreService } from './explore.service'

@Controller('explore')
export class ExploreController {
	constructor(private readonly exploreService: ExploreService) {}

	@Get('/repos/:language')
	@ApiOkResponse()
	getLanguageRepos(@Param('language') language: string) {
		return this.exploreService.explorePopularRepos(language)
		// return language
	}
}

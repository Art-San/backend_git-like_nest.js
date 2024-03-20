import { Controller, Param, Get } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'
import { ExploreService } from './explore.service'
import { ServerResponseLanguageDto } from './dto/explore.dto'

@Controller('explore')
export class ExploreController {
	constructor(private readonly exploreService: ExploreService) {}

	@Get('/repos/:language')
	@ApiOkResponse({ type: ServerResponseLanguageDto })
	getLanguageRepos(@Param('language') language: string) {
		return this.exploreService.explorePopularRepos(language)
	}
}

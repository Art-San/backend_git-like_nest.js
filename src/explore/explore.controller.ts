import { Controller, Param, Get, UseGuards } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'
import { ExploreService } from './explore.service'
import { ServerResponseLanguageDto } from './dto/explore.dto'
import { AuthGuard } from 'src/auth/guards/auth.guard'

@Controller('explore')
export class ExploreController {
	constructor(private readonly exploreService: ExploreService) {}

	// http://localhost:5000/api/explore/repos/javascript
	@UseGuards(AuthGuard)
	@Get('/repos/:language')
	@ApiOkResponse({ type: ServerResponseLanguageDto })
	getLanguageRepos(@Param('language') language: string) {
		return this.exploreService.explorePopularRepos(language)
	}
}

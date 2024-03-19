import { Module } from '@nestjs/common'
import { ExploreController } from './explore.controller'
import { ExploreService } from './explore.service'
import { ConfigService } from '@nestjs/config'

@Module({
	imports: [ConfigService],
	controllers: [ExploreController],
	providers: [ExploreService],
})
export class ExploreModule {}

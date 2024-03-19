import { Module } from '@nestjs/common'
import { ExploreController } from './explore.controller'
import { ExploreService } from './explore.service'

@Module({
	imports: [],
	// imports: [ConfigModule], //Вар-2.2 .ENV
	controllers: [ExploreController],
	providers: [ExploreService],
})
export class ExploreModule {}

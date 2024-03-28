import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiProperty, ApiOkResponse, ApiTags } from '@nestjs/swagger'

class HelloWorldDto {
	@ApiProperty()
	message: string
}
@ApiTags('App')
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	@ApiOkResponse({
		type: HelloWorldDto,
	})
	getHello(): HelloWorldDto {
		return { message: this.appService.getHello() }
	}
}

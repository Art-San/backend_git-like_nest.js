import { RepositoryClass } from 'src/types/repository.class'
import { ApiProperty } from '@nestjs/swagger'

export class ServerResponseLanguageDto {
	@ApiProperty()
	total_count: number

	@ApiProperty()
	incomplete_results: boolean

	@ApiProperty({ type: () => [RepositoryClass] }) // Указываем, что items - массив объектов типа Repository
	items: RepositoryClass[]
}

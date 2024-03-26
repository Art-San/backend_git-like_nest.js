import { ApiProperty } from '@nestjs/swagger'
import { RepositoryClass } from 'src/types/repository.class'
import { UserClass } from 'src/types/user.class'

export class UserProfileResponseDto {
	@ApiProperty({ type: () => UserClass })
	userProfile: UserClass

	@ApiProperty({ type: () => [RepositoryClass] })
	repos: RepositoryClass[]
}

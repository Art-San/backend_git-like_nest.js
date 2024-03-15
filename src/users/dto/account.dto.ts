// import { ApiProperty } from '@nestjs/swagger'
// import { IUser, Repository } from 'src/types/types.all'

// export class UserProfileResponseDto {
// 	@ApiProperty({ type: () => IUser })
// 	userProfile: IUser

// 	@ApiProperty({ type: () => [Repository] })
// 	repos: Repository[]
// }

import { ApiProperty } from '@nestjs/swagger'
import { RepositoryClass, UserClass } from 'src/types/types.all'

export class UserProfileResponseDto {
	@ApiProperty({ type: () => UserClass })
	userProfile: UserClass

	@ApiProperty({ type: () => [RepositoryClass] })
	repos: RepositoryClass[]

	// @ApiProperty({ type: () => [Repository] })
	// repos: Repository[]
}

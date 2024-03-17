import { ApiProperty } from '@nestjs/swagger'
import { RepositoryClass } from 'src/types/repository.class'
import { UserClass } from 'src/types/user.class'

export class UserProfileResponseDto {
	@ApiProperty({ type: () => UserClass })
	userProfile: UserClass

	@ApiProperty({ type: () => [RepositoryClass] })
	repos: RepositoryClass[]
}

// "IUser1 & IRepository1" относится только к типу, но используется здесь как значение.
// import { ApiProperty } from '@nestjs/swagger'
// import { IUser1, IRepository1 } from 'src/types/types.all'

// export class UserProfileResponseDto {
// 	@ApiProperty({ type: () => IUser1 })
// 	userProfile: IUser1

// 	@ApiProperty({ type: () => [IRepository1] })
// 	repos: IRepository1[]
// }

import { prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export interface UserModel extends Base {}

export class UserModel extends TimeStamps {
	@prop({ unique: true, required: true })
	username: string

	@prop({ default: '' })
	name: string

	@prop({ required: true })
	profileUrl: string

	@prop()
	avatarUrl: string

	@prop()
	email: string

	@prop({ default: [] })
	likedProfiles: [string]

	@prop()
	likedBy: [
		{
			username: {
				type: String
				required: true
			}
			avatarUrl: {
				type: String
			}
			// likedDate: {
			// 	type: globalThis.Date,
			// 	default: Date.now
			// }
		},
	]
}

// import { prop, getUserModelForClass } from '@typegoose/typegoose'
// import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

// // Определение интерфейса для объектов в массиве likedBy
// interface LikedBy {
// 	username: string
// 	avatarUrl: string
// 	likedDate: Date
// }

// // Класс, реализующий интерфейс LikedBy
// export class LikedByClass implements LikedBy {
// 	username: string
// 	avatarUrl: string
// 	likedDate: Date
// }

// export interface UserUserModel extends Base {} // Base добавляет id

// export class UserUserModel extends TimeStamps {
// 	@prop({ required: true, unique: true })
// 	username: string

// 	@prop({ default: '' })
// 	name: string

// 	@prop({ default: '' })
// 	email: string

// 	@prop({ required: true })
// 	profileUrl: string

// 	@prop()
// 	avatarUrl: string

// 	@prop({ type: [String], default: [] })
// 	likedProfiles: string[]

// 	@prop({ type: () => [LikedByClass] })
// 	likedBy: LikedByClass[]
// }

// const userUserModel = getUserModelForClass(UserUserModel)

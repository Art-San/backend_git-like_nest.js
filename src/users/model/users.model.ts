// likedDate: {
// 	type: globalThis.Date // Используем globalThis.Date для явного указания глобального объекта Date
// 	default: () => typeof globalThis.Date.now // Используем globalThis.Date.now() для получения текущего времени
// }

import { prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

class likedBy {
	@prop({ required: true })
	username?: string

	@prop()
	avatarUrl?: string

	@prop({ type: Date, default: () => Date.now })
	likedDate?: Date
}
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

	@prop({ type: () => [String], default: [] })
	likedProfiles: string[]

	@prop({ type: () => [likedBy] })
	likedBy?: likedBy[]
}

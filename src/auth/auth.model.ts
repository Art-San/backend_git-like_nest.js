import { prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export interface AuthModel extends Base {}

export class AuthModel extends TimeStamps {
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

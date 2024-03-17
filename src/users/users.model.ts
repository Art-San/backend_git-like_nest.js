import { prop, getModelForClass } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

// Определение интерфейса для объектов в массиве likedBy
interface LikedBy {
	username: string
	avatarUrl: string
	likedDate: Date
}

// Класс, реализующий интерфейс LikedBy
export class LikedByClass implements LikedBy {
	username: string
	avatarUrl: string
	likedDate: Date
}

export interface UserModel extends Base {} // Base добавляет id

export class UserModel extends TimeStamps {
	@prop({ required: true, unique: true })
	username: string

	@prop({ default: '' })
	name: string

	@prop({ default: '' })
	email: string

	@prop({ required: true })
	profileUrl: string

	@prop()
	avatarUrl: string

	@prop({ type: [String], default: [] })
	likedProfiles: string[]

	// Использование класса LikedByClass в декораторе @prop
	@prop({ type: () => [LikedByClass] })
	likedBy: LikedByClass[]
}

// Пример использования модели
const userModel = getModelForClass(UserModel)

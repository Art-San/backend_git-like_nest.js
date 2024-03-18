import { prop, getModelForClass } from '@typegoose/typegoose'

export class Product {
	@prop({ required: true })
	name: string

	@prop({ required: true })
	price: number

	@prop()
	description?: string
}

export const ProductModel = getModelForClass(Product)

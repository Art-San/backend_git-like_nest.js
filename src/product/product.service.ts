// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class ProductService {

// }

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@m8a/nestjs-typegoose'
import { Product } from './product.model'

@Injectable()
export class ProductService {
	constructor(@InjectModel(Product) private readonly productModel) {}

	async createProduct(
		name: string,
		price: number,
		description?: string
	): Promise<Product> {
		console.log(1, 'name, price, description ', name, price, description)
		// const newProduct = new this.productModel({ name, price, description })
		// return newProduct.save()
		return { name, price, description }
	}

	async getAllProducts(): Promise<Product[]> {
		return this.productModel.find().exec()
	}
}

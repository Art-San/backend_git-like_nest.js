import { Controller, Get, Post, Body } from '@nestjs/common'
import { ProductService } from './product.service'
import { Product } from './product.model'

@Controller('products')
export class ProductsController {
	constructor(private readonly productService: ProductService) {}

	@Post()
	async createProduct(
		@Body() productData: { name: string; price: number; description?: string }
	): Promise<Product> {
		return this.productService.createProduct(
			productData.name,
			productData.price,
			productData.description
		)
	}

	@Get()
	async getAllProducts(): Promise<Product[]> {
		return this.productService.getAllProducts()
	}
}

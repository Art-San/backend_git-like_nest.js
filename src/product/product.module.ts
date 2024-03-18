import { Module } from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductsController } from './product.controller'
import { TypegooseModule } from 'nestjs-typegoose'
import { Product } from './product.model'

@Module({
	imports: [TypegooseModule.forFeature([Product])],
	providers: [ProductService],
	controllers: [ProductsController],
})
export class ProductModule {}

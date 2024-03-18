import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'
import { ProductModule } from './product/product.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypegooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get<string>('MONGO_DB_URI'),
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}),
		}),
		ProductModule,
	],
})
export class AppModule {}
// import { Module, OnModuleInit, Inject } from '@nestjs/common'
// import { AppController } from './app.controller'
// import { AppService } from './app.service'
// import { UsersModule } from './users/users.module'
// import { ConfigModule, ConfigService } from '@nestjs/config'

// // import { TypegooseModule, getConnectionToken } from 'nestjs-typegoose' // RG
// import { TypegooseModule } from 'nestjs-typegoose' // GPT
// import { getMongoConfig } from './config/mongo.config'
// // import { Connection } from 'mongoose'
// import { AuthModule } from './auth/auth.module'
// import { ProductModule } from './product/product.module';

// // const configService = new ConfigService()

// @Module({
// 	imports: [
// 		ConfigModule.forRoot(),
// 		TypegooseModule.forRootAsync({
// 			imports: [ConfigModule],
// 			inject: [ConfigService],
// 			useFactory: getMongoConfig,
// 		}),
// 		UsersModule,
// 		AuthModule,
// 		ProductModule,
// 	],
// 	controllers: [AppController],
// 	providers: [AppService],
// })
// export class AppModule {}
// export class AppModule implements OnModuleInit {
// 	constructor(
// 		@Inject(getConnectionToken()) private readonly connection: Connection
// 	) {}

// 	onModuleInit() {
// 		this.connection.on('connected', () => {
// 			console.log('Mongoose connected to DB')
// 		})

// 		this.connection.on('error', (err) => {
// 			console.error('Mongoose connection error:', err)
// 		})

// 		this.connection.on('disconnected', () => {
// 			console.log('Mongoose disconnected')
// 		})
// 	}
// }

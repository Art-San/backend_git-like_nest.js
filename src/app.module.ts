import { Module, OnModuleInit, Inject } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { ConfigModule, ConfigService } from '@nestjs/config'

// import { TypegooseModule, getConnectionToken } from 'nestjs-typegoose' // RG
import { TypegooseModule, getConnectionToken } from '@m8a/nestjs-typegoose' // GPT

import { getMongoConfig } from './config/mongo.config'
import { Connection } from 'mongoose'
import { AuthModule } from './auth/auth.module'
import { AllExceptionsFilter } from './filters/all-exceptions.filter'
import { APP_FILTER } from '@nestjs/core'
import { ExploreModule } from './explore/explore.module';

// const configService = new ConfigService()

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypegooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig,
		}),
		UsersModule,
		AuthModule,
		ExploreModule,
	],
	controllers: [AppController],
	providers: [
		{
			provide: APP_FILTER,
			useClass: AllExceptionsFilter,
		},
		AppService,
	],
})
// export class AppModule {}
export class AppModule implements OnModuleInit {
	constructor(
		@Inject(getConnectionToken()) private readonly connection: Connection
	) {}

	onModuleInit() {
		this.connection.on('connected', () => {
			console.log('Mongoose connected to DB')
		})

		this.connection.on('error', (err) => {
			console.error('Mongoose connection error:', err)
		})

		this.connection.on('disconnected', () => {
			console.log('Mongoose disconnected')
		})
	}
}

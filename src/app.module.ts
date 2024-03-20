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
import { ExploreModule } from './explore/explore.module'

// const configService = new ConfigService() // Вар-1 .ENV

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true, //Вар-2.1 .ENV Это делает ConfigModule глобальным, и его не нужно импортировать в каждый модуль
		}),
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

// app.module.ts

// @Module({
// 	imports: [
// 	  // configure default options for passport
// 	  PassportModule.register({
// 		defaultStrategy: 'local',
// 		session: true,
// 	  }),
// 	],
// 	controllers: [
// 	  UserController,
// 	],
// 	providers: [
// 	  AuthService,

// 	  // add our providers
// 	  LocalStrategy, // simply by importing them will register them to passport (under the hood it calls `passport.use(...)`)
// 	  LocalSerializer,
// 	  LocalAuthGuard,
// 	],
//   })
//   export class AppModule {}

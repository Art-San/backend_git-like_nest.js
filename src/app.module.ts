import { Module, OnModuleInit, Inject } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { ConfigModule, ConfigService } from '@nestjs/config'

// import { TypegooseModule, getConnectionToken } from 'nestjs-typegoose' // RG
import { TypegooseModule, getConnectionToken } from '@m8a/nestjs-typegoose' // GPT

import { getMongoConfig } from './config/mongo.config'

import { AuthModule } from './auth/auth.module'

import { ExploreModule } from './explore/explore.module'
import { PassportModule } from '@nestjs/passport'

// const configService = new ConfigService() // Вар-1 .ENV

@Module({
	imports: [
		// PassportModule.register({
		// 	defaultStrategy: 'local',
		// 	session: true,
		// }),
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
	providers: [AppService],
})
export class AppModule {}

// app.module.ts

// @Module({
// 	imports: [
// 	  // настроить параметры по умолчанию для паспорта
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

// 	  // добавьте наших провайдеров
// 	  LocalStrategy, // просто импортировав их, они зарегистрируются в паспорте (под капотом он вызывает `passport.use(...)`)
// 	  LocalSerializer,
// 	  LocalAuthGuard,
// 	],
//   })
//   export class AppModule {}

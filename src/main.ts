// import { NestFactory } from '@nestjs/core'
// import { AppModule } from './app.module'
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
// import { ValidationPipe } from '@nestjs/common'
// import * as dotenv from 'dotenv'

// dotenv.config() // Вар-3 process.env

// async function bootstrap() {
// 	const app = await NestFactory.create(AppModule)
// 	app.setGlobalPrefix('api')

// 	const config = new DocumentBuilder().setTitle('GitHub-Like').build()
// 	const document = SwaggerModule.createDocument(app, config)

// 	SwaggerModule.setup('api2', app, document)

// 	app.useGlobalPipes(new ValidationPipe()) // глобальный ValidationPipe не надо в контроллерах так писать @UsePipes(new ValidationPipe())
// 	await app.listen(5000)
// }
// bootstrap()
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import * as dotenv from 'dotenv'
import * as session from 'express-session'

dotenv.config() // Вар-3 process.env

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix('api')

	const config = new DocumentBuilder().setTitle('GitHub-Like').build()
	const document = SwaggerModule.createDocument(app, config)

	SwaggerModule.setup('api2', app, document)

	app.useGlobalPipes(new ValidationPipe()) // глобальный ValidationPipe не надо в контроллерах так писать @UsePipes(new ValidationPipe())

	// Настройка express-session
	app.use(
		session({
			secret: 'my-secret', // Замените на свой секретный ключ
			resave: false,
			saveUninitialized: false,
		})
	)

	await app.listen(5000)
}
bootstrap()

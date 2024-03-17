import { ConfigService } from '@nestjs/config' // Доступ до ENV
// import { TypegooseModuleOptions } from 'nestjs-typegoose'
import { TypegooseModuleOptions } from '@m8a/nestjs-typegoose'

export const getMongoConfig = async (
	configService: ConfigService
): Promise<TypegooseModuleOptions> => ({
	uri: configService.get('MONGO_DB_URI'),
})

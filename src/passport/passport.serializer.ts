// https://github.com/nestjs/nest/issues/1365
import { Injectable } from '@nestjs/common'
import { GithubStrategy } from 'src/auth/passport/github.strategy'

@Injectable()
export class LocalSerializer extends GithubStrategy {
	// constructor() {}

	serializeUser(user: any, done: CallableFunction) {
		console.log(2, user)
		done(null, user)
	}

	async deserializeUser(obj: any, done: CallableFunction) {
		done(null, obj)
	}
}

// https://github.com/nestjs/passport/blob/master/lib/passport/passport.serializer.ts
// import * as passport from 'passport'
// export abstract class PassportSerializer {
// 	abstract serializeUser(user: any, done: Function)
// 	abstract deserializeUser(payload: any, done: Function)

// 	constructor() {
// 		const passportInstance = this.getPassportInstance()
// 		passportInstance.serializeUser((user, done) =>
// 			this.serializeUser(user, done)
// 		)
// 		passportInstance.deserializeUser((payload, done) =>
// 			this.deserializeUser(payload, done)
// 		)
// 	}

// 	getPassportInstance() {
// 		return passport
// 	}
// }

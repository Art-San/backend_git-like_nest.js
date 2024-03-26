import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy as GitHubStrategy } from 'passport-github2'
import { InjectModel } from '@m8a/nestjs-typegoose'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { UserModel } from 'src/users/model/users.model'

@Injectable()
export class GithubStrategy extends PassportStrategy(GitHubStrategy, 'github') {
	constructor(
		@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>
	) {
		super({
			clientID: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
			callbackURL: '/api/auth/github/callback',
			passReqToCallback: true, // важная штука,
			scope: ['user:email'],
		})
	}

	async validate(
		request: any,
		accessToken: string,
		refreshToken: string,
		profile: Profile, // ?
		// profile: any,
		done: Function
	) {
		// console.log(0, 'request', request.path) //
		// console.log(1, 'profile.username', profile.username) // Art-San
		const user = await this.userModel.findOne({ username: profile.username })
		if (!user) {
			const newUser = new this.userModel({
				name: profile.displayName,
				username: profile.username,
				// email: profile.emails[0].value,
				profileUrl: profile.profileUrl,
				avatarUrl: profile.photos[0].value,
				likedProfiles: [],
				likedBy: [],
			})
			await newUser.save()
			done(null, newUser)
		} else {
			done(null, user)
		}
	}
}

// 1  github.strategy.ts
// import { Injectable } from '@nestjs/common'
// import { PassportStrategy } from '@nestjs/passport'
// import { getModelForClass } from '@typegoose/typegoose'
// import { Strategy as GitHubStrategy } from 'passport-github2'
// import { UsersModel } from 'src/users/users.model'

// const userModel = getModelForClass(UsersModel)

// @Injectable()
// export class GithubStrategy extends PassportStrategy(GitHubStrategy, 'github') {
// 	constructor() {
// 		super({
// 			clientID: process.env.GITHUB_ID,
// 			clientSecret: process.env.GITHUB_SECRET,
// 			callbackURL: '/api/auth/github/callback',
// 			scope: ['user:email'],
// 		})
// 	}

// 	async validate(
// 		accessToken: string,
// 		refreshToken: string,
// 		profile: any,
// 		done: Function
// 	) {

// 		const user = await userModel.findOne({ username: profile.username })

// 		if (!user) {
// 			const newUser = new userModel({
// 				name: profile.displayName,
// 				username: profile.username,
// 				profileUrl: profile.profileUrl,
// 				avatarUrl: profile.photos[0].value,
// 				likedProfiles: [],
// 				likedBy: [],
// 			})

// 			await newUser.save()
// 			done(null, newUser)
// 		} else {
// 			done(null, user)
// 		}
// 	}
// }

import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy as GitHubStrategy } from 'passport-github2'

@Injectable()
export class GithubStrategy extends PassportStrategy(GitHubStrategy, 'github') {
	constructor() {
		super({
			clientID: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
			callbackURL: '/api/auth/github/callback',
			scope: ['user:email'],
		})
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: Profile, // ?
		// profile: any,
		done: Function
	) {
		const user = {
			name: profile.displayName,
			username: profile.username,
			email: profile.emails[0].value,
			profileUrl: profile.profileUrl,
			avatarUrl: profile.photos[0].value,
			likedProfiles: [],
			likedBy: [],
		}

		done(null, user)
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

// .. --------------------------  stackoverflow
// github.strategy.ts
// https://stackoverflow.com/questions/78147702/how-can-i-properly-implement-githhub-oauth2-0-authentication-alongside-jwt-authe
// import { Injectable, Logger } from '@nestjs/common';

// import { PassportStrategy } from '@nestjs/passport';
// import {
//   Strategy,
//   Profile,
//   StrategyOptionsWithRequest,
// } from 'passport-github2';
// import { AuthenticationService } from '../authentication.service';
// import { Request } from 'express';
// import { AuthService } from '../auth.service';

// type VerifyCallback = (error: any, user?: any, info?: any) => void;

// const githubOptions: StrategyOptionsWithRequest = {
//   clientID: process.env.GITHUB_ID,
//   clientSecret: process.env.GITHUB_SECRET,
//   callbackURL: '/api/auth/github/callback',
//   passReqToCallback: true,
//   scope: ['user:email'],
// };

// @Injectable()
// export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
//   private readonly logger = new Logger(GithubStrategy.name);
//   constructor(private readonly authService: AuthService) {
//     super(githubOptions);
//   }

//   async validate(
//     req: Request,
//     accessToken: string,
//     _refreshToken: string,
//     profile: Profile,
//     done: VerifyCallback,
//   ): Promise<any> {
//     try {
//       console.log('GitHub Profile:', profile);
//       const user = await this.authService.validateGithubUser(profile);
//       console.log('User object from AuthService:', user);
//       if (!user) {
//         console.log('No user found');
//         return done(null, false);
//       }
//       console.log('User object passed to done callback:', user);
//       return done(null, user);
//     } catch (err) {
//       this.logger.error('Failed to validate github authentication', {
//         error: err,
//       });
//       throw new Error(err);
//     }
//   }
// }

// github.guard.ts
// import {
// 	ExecutionContext,
// 	Injectable,
// 	UnauthorizedException,
//   } from '@nestjs/common';
//   import { AuthGuard } from '@nestjs/passport';

//   @Injectable()
//   export class GithubAuthGuard extends AuthGuard('github') {
// 	canActivate(context: ExecutionContext) {
// 	  return super.canActivate(context);
// 	}

// 	// eslint-disable-next-line @typescript-eslint/no-unused-vars
// 	handleRequest(err, user, _info) {
// 	  if (err || !user) {
// 		throw err || new UnauthorizedException();
// 	  }
// 	  return user;
// 	}
//   }

// authentication.module.ts
// import { Global, Module } from '@nestjs/common';
// import { PassportModule } from '@nestjs/passport';
// import { EventEmitterModule } from '@nestjs/event-emitter';
// import { JwtModule } from '@nestjs/jwt';
// import { AuthenticationController } from './authentication.controller';
// import { AuthenticationService } from './authentication.service';
// import { LocalStrategy } from './strategies/local.strategy';
// import { AccessTokenJwtStrategy } from './strategies/access-token.strategy';
// import { AppEventHandler } from '@/common/events/app.events';
// import { GithubStrategy } from './strategies/github.strategy';

// @Global()
// @Module({
//   imports: [
//     PassportModule.register({
//       defaultStrategy: ['jwt', 'github'],
//       session: false,
//     }),
//     JwtModule.register({}),
//     EventEmitterModule.forRoot(),
//   ],
//   controllers: [AuthenticationController],
//   providers: [
//     AuthenticationService,
//     LocalStrategy,
//     AccessTokenJwtStrategy,
//     GithubStrategy,
//     AppEventHandler,
//   ],
//   exports: [AuthenticationService],
// })
// export class AuthenticationModule {}

// auth.controller.ts
// @UseGuards(GithubAuthGuard)
// @Get('/auth/github')
// public githubAuth() {}

// @UseGuards(GithubAuthGuard)
// @Get('/auth/github/callback')
// public async githubAuthCallback(@Req() req: Request) {
//   const user = req.user;
//   console.log('User object in controller:', user);
//   if (!user) {
//     return { message: 'Authentication failed' };
//   }
//   return { message: 'Authentication successful', user: user };
// }

// @Injectable()
// export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
// 	constructor() {
// 		super({
// 			clientID: '',
// 			clientSecret: '',
// 			callbackURL: 'http://localhost:3000/auth/google/callback',
// 			passReqToCallback: true,
// 			scope: ['profile'],
// 		})
// 	}

// 	async validate(
// 		request: any,
// 		accessToken: string,
// 		refreshToken: string,
// 		profile
// 	) {
// 		return profile
// 	}
// }

// @Controller('auth')
// export class AuthController {
// 	constructor(private readonly authService: AuthService) {}

// 	@Get('google')
// 	@UseGuards(AuthGuard('google'))
// 	googleLogin() {
// 		// initiates the Google OAuth2 login flow
// 	}

// 	@Get('google/callback')
// 	@UseGuards(AuthGuard('google'))
// 	async googleLoginCallback(@Req() req, @Res() res, @Session() session) {
// 		// here i have req.user with profile
// 	}
// }

// @Injectable()
// export class GoogleAuthGuard extends AuthGuard('google') {
// 	canActivate(
// 		context: ExecutionContext
// 	): boolean | Promise<boolean> | Observable<boolean> {
// 		console.log('Custom google guard')
// 	}
// 	handleRequest(err, user, info) {
// 		console.log('Custom google guard')
// 	}
// }

// @Injectable()
// export class GoogleAuthGuard extends AuthGuard('google') {
// 	canActivate(context: ExecutionContext) {
// 		const request = context.switchToHttp().getRequest()
// 		super.logIn(request)
// 		return super.canActivate(context)
// 	}
// }

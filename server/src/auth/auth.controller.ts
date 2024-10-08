import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, SignupDTO } from './dto';

@Controller('auth')
export class AuthController {
	constructor (private authService: AuthService) {}

	@Post('signup')
	signup(@Body() dto: SignupDTO) {
		return this.authService.signup(dto);
	}

	@Post('login')
	login(@Body() dto: LoginDTO) {
		return this.authService.login(dto);
	}
}

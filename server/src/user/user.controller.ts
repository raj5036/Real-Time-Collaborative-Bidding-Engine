import { Controller, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JWTGuard } from 'src/auth/guard';

@UseGuards(JWTGuard)
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}
}

import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from 'src/auth/decorator';
import { AcceptBidRequestDTO } from './dto';
import { JWTGuard } from 'src/auth/guard';

@UseGuards(JWTGuard)
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post("accept-bid-request")
	acceptBidRequest (@GetUser('id') userId: string, @Body() dto: AcceptBidRequestDTO) {
		return this.userService.acceptBidRequest(userId, dto)
	}
}

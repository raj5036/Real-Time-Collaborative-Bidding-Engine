import { Controller, UseGuards } from '@nestjs/common';
import { JWTGuard } from 'src/auth/guard';

@UseGuards(JWTGuard)
@Controller('user-active-bid')
export class UserActiveBidController {}

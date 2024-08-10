import { Controller, UseGuards } from '@nestjs/common';
import { JWTGuard } from 'src/auth/guard';
import { BidderGuard } from './guard';

@UseGuards(JWTGuard, BidderGuard)
@Controller('bidder')
export class BidderController {}

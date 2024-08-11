import { Body, Controller, Delete, Get, UseGuards } from '@nestjs/common';
import { JWTGuard } from 'src/auth/guard';
import { BidderGuard } from './guard';
import { BidderService } from './bidder.service';
import { DeleteActiveBidsDTO } from './dto';
import { GetUser } from 'src/auth/decorator';

@UseGuards(JWTGuard, BidderGuard)
@Controller('bidder')
export class BidderController {
	constructor(private readonly bidderService: BidderService) {}

	@Get("get-active-bids")
	getAllAcceptedBids (@GetUser('id') userId: string) {
		return this.bidderService.getAllAcceptedBids(userId)
	}

	@Delete("delete-active-bids")
	async deleteActiveBids(@Body() dto: DeleteActiveBidsDTO) {
		return  this.bidderService.deleteActiveBids(dto);
	}
}

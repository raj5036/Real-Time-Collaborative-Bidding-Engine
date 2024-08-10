import { Body, Controller, Delete, UseGuards } from '@nestjs/common';
import { JWTGuard } from 'src/auth/guard';
import { BidderGuard } from './guard';
import { BidderService } from './bidder.service';
import { DeleteActiveBidsDTO } from './dto';

@UseGuards(JWTGuard, BidderGuard)
@Controller('bidder')
export class BidderController {
	constructor(private readonly bidderService: BidderService) {}

	@Delete("delete-active-bids")
	async deleteActiveBids(@Body() dto: DeleteActiveBidsDTO) {
		return  this.bidderService.deleteActiveBids(dto);
	}
}

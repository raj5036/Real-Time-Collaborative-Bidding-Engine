import { BidderGateway } from './bidder.gateway';
import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { JWTGuard } from 'src/auth/guard';
import { BidderGuard } from './guard';
import { BidderService } from './bidder.service';
import { DeleteActiveBidsDTO, EditBidAmountDTO } from './dto';
import { GetUser } from 'src/auth/decorator';
import { GetBidAmountDTO } from './dto/get-bid-amount.dto';

@UseGuards(JWTGuard, BidderGuard)
@Controller('bidder')
export class BidderController {
	constructor(
		private readonly bidderService: BidderService,
		private readonly bidderGateway: BidderGateway
	) {}

	@Get("get-active-bids")
	getAllAcceptedBids (@GetUser('id') userId: string) {
		return this.bidderService.getAllAcceptedBids(userId)
	}

	// This api returns the bid amount of provided bidIds of the user
	@Post("get-bid-amount-by-ids")
	getBidAmount (@GetUser('id') userId: string, @Body() dto: GetBidAmountDTO) {
		return this.bidderService.getBidAmount(userId, dto)
	}

	@Patch("edit-bid-amount")
	async editBidAmount (@GetUser('id') userId: string, @Body() dto: EditBidAmountDTO) {
		const response = await this.bidderService.editBidAmount(userId, dto);
		if (response.success) {
			this.bidderGateway.server.emit("BidUpdated", response);
			return response
		}
	}

	@Delete("delete-active-bids")
	async deleteActiveBids(@Body() dto: DeleteActiveBidsDTO) {
		return  this.bidderService.deleteActiveBids(dto);
	}
}

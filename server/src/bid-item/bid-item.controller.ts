import { BidItemGateway } from './bid-item.gateway';
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BidItemService } from './bid-item.service';
import { CreateBidDTO, DeleteBulkDTO } from './dto';
import { JWTGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { BidCreatorGuard } from 'src/user/guard';

@UseGuards(JWTGuard, BidCreatorGuard)
@Controller('bid-item')
export class BidItemController {
	constructor (
		private readonly bidItemService: BidItemService,
		private readonly bidItemGateway: BidItemGateway
	) {}

	@Post('create')
	async createBid (@Body() dto: CreateBidDTO, @GetUser('id') userId: string) {
		const response = await this.bidItemService.createBid(dto, userId);
		if (response.success) {
			this.bidItemGateway.server.emit("BidCreated", response);
		}
		return response;
	}

	@Get('get-all-by-user')
	getAllBidsByUser (@GetUser('id') userId: string) {
		return this.bidItemService.getAllBidsByUser(userId);
	}

	@Delete('delete-bulk')
	deleteBidsInBulk (@Body() { ids }: DeleteBulkDTO) {
		return this.bidItemService.deleteBidsInBulk(ids);
	} 

	@Delete('delete/:id')
	deleteBid (@Param('id') id: string) {
		console.log("here in delete bid", id);
		return this.bidItemService.deleteBid(id);
	}

	@Delete('delete-all')
	deleteAllBids () {
		return this.bidItemService.deleteAllBids();
	}
}

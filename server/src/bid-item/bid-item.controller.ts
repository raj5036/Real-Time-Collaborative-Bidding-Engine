import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BidItemService } from './bid-item.service';
import { CreateBidDTO } from './dto';
import { JWTGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { BidCreatorGuard } from 'src/user/guard';

@UseGuards(JWTGuard, BidCreatorGuard)
@Controller('bid-item')
export class BidItemController {
	constructor (private bidItemService: BidItemService) {}

	@Post('create')
	createBid (@Body() dto: CreateBidDTO, @GetUser('id') userId: string) {
		return this.bidItemService.createBid(dto, userId);
	}

	@Get('get-all-by-user')
	getAllBidsByUser (@GetUser('id') userId: string) {
		return this.bidItemService.getAllBidsByUser(userId);
	}

	@Delete('delete-bulk')
	deleteBidsInBulk (@Body() ids: Array<string>) {
		return this.bidItemService.deleteBidsInBulk(ids);
	} 

	@Delete('delete/:id')
	deleteBid (@Param('id') id: string) {
		console.log("here in delete bid", id);
		return this.bidItemService.deleteBid(id);
	}
}

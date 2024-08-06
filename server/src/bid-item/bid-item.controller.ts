import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
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

	@Delete('delete')
	deleteBid () {
		return this.bidItemService.deleteBid();
	}
}

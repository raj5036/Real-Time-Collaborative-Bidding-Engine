import { Body, Controller, Delete, Post, UseInterceptors } from '@nestjs/common';
import { BidItemService } from './bid-item.service';
import { CreateBidDTO } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('bid-item')
export class BidItemController {
	constructor (private bidItemService: BidItemService) {}

	@Post('create')
	@UseInterceptors(FileInterceptor('file'))
	createBid (@Body() dto: CreateBidDTO) {
		return this.bidItemService.createBid(dto);
	}

	@Delete('delete')
	deleteBid () {
		return this.bidItemService.deleteBid();
	}
}

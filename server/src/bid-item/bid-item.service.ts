import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBidDTO } from './dto';

@Injectable()
export class BidItemService {
	constructor (private prisma: PrismaService) {}

	async createBid (bid: CreateBidDTO) {
		console.log(bid)
	}

	async deleteBid () {}
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBidDTO } from './dto';

@Injectable()
export class BidItemService {
	constructor (private prisma: PrismaService) {}

	async createBid (bid: CreateBidDTO, userId: string) {
		try {
			console.log("userId in service", userId);
			const { title,  startTime, endTime, bidItems} = bid;
			const newBid = await this.prisma.bid.create({
				data: {
					title,
					startTime,
					endTime,
					bidItems,
					userId: userId,
				}
			});

			return {newBid};
		} catch (error) {
			return this.prisma.errorHandler(error);
		}
	}

	async deleteBid () {}
}

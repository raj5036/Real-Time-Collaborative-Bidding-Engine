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

			return {
				success: true,
				newBid
			};
		} catch (error) {
			return this.prisma.errorHandler(error);
		}
	}

	async getAllBidsByUser (userId: string) {
		try {
			const bids = await this.prisma.bid.findMany({
				where: {
					userId
				}
			});
			return {
				success: true,
				bids
			};
		} catch (error) {
			return this.prisma.errorHandler(error);
		}
	}

	async deleteBidsInBulk (ids: Array<string>) {
		try {
			const bids = await this.prisma.bid.deleteMany({
				where: {
					id: {
						in: ids
					}
				}
			});
			
			return {
				success: true,
				bids
			};
		} catch (error) {
			return this.prisma.errorHandler(error);
		}
	}

	async deleteBid (id: string) {
		try {
			const bid = await this.prisma.bid.delete({
				where: {
					id
				}
			});
			return bid;
		} catch(error) {
			return this.prisma.errorHandler(error);
		}
	}
}

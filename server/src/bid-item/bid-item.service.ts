import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBidDTO } from './dto';

@Injectable()
export class BidItemService {
	constructor (private prisma: PrismaService) {}

	async createBid (bid: CreateBidDTO, userId: string) {
		try {
			console.log("userId in service", userId);
			const { title, startDate,  startTime, endDate, endTime, bidItems} = bid;
			const newBid = await this.prisma.bid.create({
				data: {
					title,
					startDate,
					startTime,
					endDate,
					endTime,
					bidItems,
					bidCreatorId: userId
				}
			});

			console.log("newBid", newBid);

			return {
				success: true,
				message: "Bid created successfully",
				newBid
			};
		} catch (error) {
			console.log("error triggered", error);
			return this.prisma.errorHandler(error);
		}
	}

	async getAllBidsByUser (userId: string) {
		try {
			const bids = await this.prisma.bid.findMany({
				where: {
					bidCreatorId: userId
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

	async deleteBidsInBulk (ids: string[]) {
		console.log("ids in service", ids);
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
				message: "Bids deleted successfully",
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

	async deleteAllBids () {
		try {
			const bids = await this.prisma.bid.deleteMany({});
			return bids;
		} catch (error) {
			return this.prisma.errorHandler(error);
		}
	}
}

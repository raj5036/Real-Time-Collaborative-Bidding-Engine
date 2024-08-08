import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AcceptBidRequestDTO } from './dto';
import { UserActiveBid } from '@prisma/client';

@Injectable()
export class UserService {
	constructor(
		private readonly prisma: PrismaService
	) {}

	async acceptBidRequest (userId: string, dto: AcceptBidRequestDTO) {
		console.log("here in accept bid request", userId)
		try {
			const response = await this.prisma.userActiveBid.create({
				data: {
					userId,
					bidId: dto.bidId,
				}
			})

			return {
				success: true,
				message: "Bid request accepted successfully",
				response
			}
		} catch (error) {
			return this.prisma.errorHandler(error);
		}
	}

	async getAllAcceptedBids (userId: string) {
		try {
			const userActiveBids: UserActiveBid[] = await this.prisma.userActiveBid.findMany({
				where: {
					userId
				}
			})
			console.log("userActiveBids in service", userActiveBids)
			const bids = await this.prisma.bid.findMany({
				where: {
					id: {
						in: userActiveBids.map(bid => bid.bidId)
					}
				}
			})
			return {
				success: true,
				message: "Bids fetched successfully",
				bids
			}
		} catch (error) {
			return this.prisma.errorHandler(error);
		}
	}
}

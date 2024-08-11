import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeleteActiveBidsDTO } from './dto';
import { UserActiveBid } from '@prisma/client';

@Injectable()
export class BidderService {
	constructor (private readonly prisma: PrismaService) {}

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

	async deleteActiveBids (dto: DeleteActiveBidsDTO) {
		try {
			const response = await this.prisma.userActiveBid.deleteMany({
				where: {
					bidId: {
						in: dto.deleteIds
					}
				}
			})

			return {
				success: true,
				message: 'Active bids deleted successfully',
				response
			}
		} catch (error) {
			return this.prisma.errorHandler(error);
		}
	}
}

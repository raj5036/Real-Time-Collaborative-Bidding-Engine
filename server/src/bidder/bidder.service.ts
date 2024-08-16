import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AcceptBidRequestDTO, DeleteActiveBidsDTO, EditBidAmountDTO } from './dto';
import { UserActiveBid } from '@prisma/client';
import { GetBidAmountDTO } from './dto/get-bid-amount.dto';

@Injectable()
export class BidderService {
	constructor (private readonly prisma: PrismaService) {}

	async acceptBidRequest (userId: string, dto: AcceptBidRequestDTO) {
		console.log("here in accept bid request", userId)
		try {
			const acceptResponse = await this.prisma.userActiveBid.create({
				data: {
					userId,
					bidId: dto.bidId,
				}
			})

			//Put bid inside bidder's active bids
			await this.prisma.user.update({
				where: {
					id: userId
				},
				data: {
					activeBids: {
						connect: {
							id: dto.bidId
						}
					}
				}
			})

			// Put Bidder inside the bid's currentBidders
			await this.prisma.bid.update({
				where: {
					id: dto.bidId
				},
				data: {
					currentBidders: {
						connect: {
							id: userId
						}
					}
				}
			})

			return {
				success: true,
				message: "Bid request accepted successfully",
				acceptResponse
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

	async getBidAmount (userId: string, dto: GetBidAmountDTO) {
		try {
			const { bidIds } = dto
			const bidAmounts = await this.prisma.userActiveBid.findMany({
				where: {
					userId,
					bidId: {
						in: bidIds
					}
				},
				select: {
					bidId: true,
					bidAmount: true
				}
			})

			return {
				success: true,
				message: 'Bid amounts fetched successfully',
				bidAmounts
			}
		} catch (error) {
			return this.prisma.errorHandler(error);
		}
	}

	async editBidAmount (userId: string, dto: EditBidAmountDTO) {
		try {
			const { bidId, amount } = dto
			const result = await this.prisma.userActiveBid.updateMany({
				where: {
					AND: [
						{ userId },
						{ bidId }
					]
				},
				data: {
					bidAmount: amount
				}
			})

			return {
				success: true,
				message: 'Bid amount updated successfully',
				result
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

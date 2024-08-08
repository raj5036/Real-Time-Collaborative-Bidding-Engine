import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AcceptBidRequestDTO } from './dto';

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
}

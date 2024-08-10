import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeleteActiveBidsDTO } from './dto';

@Injectable()
export class BidderService {
	constructor (private readonly prisma: PrismaService) {}

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

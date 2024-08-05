import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class PrismaService extends PrismaClient {
	constructor(configService: ConfigService) {
		super({
			datasources: {
				db: {
					url: configService.get<string>('DATABASE_URL'),
				},
			}
		});
		console.log('mongoDB url', configService.get('DATABASE_URL'));
	}

	
	isValidObjectId (id: string): boolean {
		return /^[0-9a-fA-F]{24}$/.test(id);
	}

	errorHandler = (error) => {
		if (error instanceof PrismaClientKnownRequestError) {
			if (error.code === 'P2002') {
				return {
					success: false,
					message: 'Data already exists',
				}
			}

			if (error.code === 'P2003') {
				return {
					success: false,
					message: 'Data already exists',
				}
			}

			if (error.code === 'P2025') {
				return {
					success: false,
					message: 'Requested data not found',
				}
			}
		} else {
			return {error};
		}
	};
}

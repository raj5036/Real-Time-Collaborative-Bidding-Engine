import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginDTO, SignupDTO } from './dto';
import * as argon from "argon2"
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
	constructor (
		private prisma: PrismaService,
		private jwt: JwtService,
		private config: ConfigService,
	) {}
	async signup (dto: SignupDTO) {
		try {
			const { email, password, firstname, lastname, role } = dto;
			const hashedPassword = await argon.hash(password)
			const user = await this.prisma.user.create({
				data: {
					email,
					password: hashedPassword,
					firstname,
					lastname,
					role,
				}, 
				select: {
					id: true,
					email: true,
					role: true,
					createdAt: true
				}
			})
			return {
				user,
				token: await this.signToken(user.id, user.email, user.role)
			};	
		} catch (error) {
			return this.prisma.errorHandler(error);
		}
	}

	async login (dto: LoginDTO) {
		try {
			const { email, password } = dto;
			const user = await this.prisma.user.findUnique({
				where: {
					email
				}
			});

			if (!user) {
				throw new ForbiddenException('Credentials incorrect');
			}

			const pwMatches = await argon.verify(user.password, password);
			if (!pwMatches) {
				throw new ForbiddenException('Credentials incorrect');
			}

			return {
				id: user.id,
				email: user.email,
				token: await this.signToken(user.id, user.email, user.role)
			};
		} catch (error) {
			return this.prisma.errorHandler(error);
		}
	}

	async signToken (userId: string, email: string, role: string): Promise<string> {
		const payload = {
			sub: userId,
			email,
			role
		}

		const access_token = await this.jwt.sign(payload, { expiresIn: '24h', secret: this.config.get('JWT_SECRET') })
		return access_token 
	}
}

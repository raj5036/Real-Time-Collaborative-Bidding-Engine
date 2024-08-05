import { Injectable } from '@nestjs/common';
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
					createdAt: true
				}
			})
			return {
				user,
				token: await this.signToken(user.id, user.email)
			};	
		} catch (error) {
			return this.prisma.errorHandler(error);
		}
	}

	async login (dto: LoginDTO) {
		const {} = dto;
		return "login";
	}

	async signToken (userId: string, email: string): Promise<string> {
		const payload = {
			sub: userId,
			email
		}

		const access_token = await this.jwt.sign(payload, { expiresIn: '24h', secret: this.config.get('JWT_SECRET') })
		return access_token 
	}
}

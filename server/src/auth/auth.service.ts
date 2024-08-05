import { Injectable } from '@nestjs/common';
import { LoginDTO, SignupDTO } from './dto';
import * as argon from "argon2"
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
	constructor (private prisma: PrismaService) {}
	async signup (dto: SignupDTO) {
		const { email, password, firstname, lastname, role } = dto;
		const hashedPassword = await argon.hash(password)
		const newUser = await this.prisma.user.create({
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
		return newUser;	
	}

	async login (dto: LoginDTO) {
		const {} = dto;
		return "login";
	}
}

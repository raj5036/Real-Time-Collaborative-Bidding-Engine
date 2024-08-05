import { IsEmail, IsIn, IsNotEmpty, IsString } from "class-validator";
import { USER_ROLES } from "src/utils/constants";

export class SignupDTO {
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	password: string;

	@IsString()
	@IsNotEmpty()
	firstname: string;

	@IsString()
	@IsNotEmpty()
	lastname: string;

	@IsString()
	@IsNotEmpty()
	@IsIn([USER_ROLES.BIDDER, USER_ROLES.BID_CREATOR], {
		message: `role must be one of ${USER_ROLES.BIDDER} or ${USER_ROLES.BID_CREATOR}`,
	})
	role: string
}
import { IsNotEmpty, IsString } from "class-validator";

export class AcceptBidRequestDTO {
	@IsString()
	@IsNotEmpty()
	bidId: string
}
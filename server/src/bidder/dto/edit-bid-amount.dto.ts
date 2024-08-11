import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class EditBidAmountDTO {
	@IsNumber()
	@IsPositive()
	amount: number

	@IsString()
	@IsNotEmpty()
	bidId: string
}
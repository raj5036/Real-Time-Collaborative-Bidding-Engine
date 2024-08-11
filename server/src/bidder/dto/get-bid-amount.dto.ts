import { IsArray, IsNotEmpty } from "class-validator";

export class GetBidAmountDTO {
	@IsArray()
	@IsNotEmpty()
	bidIds: Array<string>
}
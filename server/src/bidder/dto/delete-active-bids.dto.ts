import { IsArray, IsNotEmpty } from "class-validator";

export class DeleteActiveBidsDTO {
	@IsArray()
	@IsNotEmpty()
	deleteIds: Array<string>;
}
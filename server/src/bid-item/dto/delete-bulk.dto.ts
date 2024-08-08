import { IsArray, IsNotEmpty } from "class-validator";

export class DeleteBulkDTO {
	@IsArray()
	@IsNotEmpty()
	ids: string[]
}
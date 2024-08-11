import { IsArray, IsNotEmpty, IsString } from "class-validator"

export class CreateBidDTO {
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsString()
	@IsNotEmpty()
	startDate: string;

	@IsString()
	@IsNotEmpty()
	startTime: string

	@IsString()
	@IsNotEmpty()
	endDate: string
	
	@IsString()
	@IsNotEmpty()
	endTime: string

	@IsNotEmpty()
	@IsArray()
	bidItems: Array<BidItem>
}

export class BidItem {
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsString()
	@IsNotEmpty()
	description: string;

	@IsString()
	@IsNotEmpty()
	price: number;
}
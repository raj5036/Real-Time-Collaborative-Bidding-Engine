export interface CreateBidDTO {
	title: string,
	startTime: string,
	endTime: string,
	bidItem: BidItem[]
}

export interface BidItem {
	title: string,
	description: string,
	price: number,
	image: string
}
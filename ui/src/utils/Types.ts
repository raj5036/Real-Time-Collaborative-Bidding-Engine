import { USER_TYPES } from "./Constants"

export type IUser = {
	id: string,
	email: string,
	firstname: string,
	lastname: string,
	role: UserType,
	bids: IBid[]
}

export type UserType = typeof USER_TYPES[keyof typeof USER_TYPES]

export type IBid = {
	id?: string,
	title: string,
	startDate: string,
	startTime: string,
	endDate: string,
	endTime: string,
	bidItems: IBidItem[],
}

export type IBidItem = {
	title: string,
	description?: string,
	price: number,
}

export type IBidStatus = "active" | "expired" | "closed"

export type IActiveBid = {
	bid: IBid,
	bidStatus: IBidStatus
	highestBidPrice: number
	currentBidPrice: number
	winnerUserId: string
	winnerName: string
}

export type IActiveBidListRowData = {
	id: string
	bidTitle: string
	startDate: string
	startTime: string
	endDate: string
	endTime: string
	bidItems: string
	bidStatus: IBidStatus
	basePrice: number
	highestBidPrice: number
	yourBid: number
}
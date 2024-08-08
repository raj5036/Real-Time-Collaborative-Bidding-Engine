import { USER_TYPES } from "./Constants"

export type UserType = typeof USER_TYPES[keyof typeof USER_TYPES]

export type IBid = {
	id?: string,
	title: string,
	startTime: string,
	endTime: string,
	bidItems: IBidItem[],
}

export type IBidItem = {
	title: string,
	description?: string,
	price: number,
}

export type IBidStatus = "active" | "expired" | "closed"
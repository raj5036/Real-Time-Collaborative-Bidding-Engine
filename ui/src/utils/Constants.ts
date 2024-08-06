export const USER_TYPES = {
	BID_CREATOR: "Bid Creator",
	BIDDER: "Bidder"
}

export type UserType = typeof USER_TYPES[keyof typeof USER_TYPES]

export const LocalStorageKeys = {
	USER_TOKEN: "user_token",
	USER_DETAILS: "user_details"
}
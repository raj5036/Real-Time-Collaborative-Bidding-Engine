const AppRoutes = {
	LOGIN: "login",
	SIGNUP: "signup",
	MAIN: "/",
	DASHBOARD: "/dashboard",
	CREATE_BID: "/create-bid",
	BIDS_LEADERBOARD: "/bids-leaderboards",
	LEADERBOARD_DETAILS: (bidId: string) => `/leaderboard/${bidId}`,
	ALL_BIDS: "/all-bids-created",
	USER_CURRENT_BIDS: "/user-current-bids",
	BIDDING_PAGE: "/bidding-page",
}

export default AppRoutes
export const USER_ROLES = {
	BID_CREATOR: "Bid Creator",
	BIDDER: "Bidder"
}

export const SOCKET_GATEWAY_CORS_POLICY = {
	origin: ['http://localhost:5173'], // List the allowed origins
	methods: ['GET', 'POST'],
	allowedHeaders: ['Content-Type'],
	credentials: true,
}

export const BID_STATUS = {
	ACTIVE: "active",
	EXPIRED: "expired",
	CLOSED: "closed"
}
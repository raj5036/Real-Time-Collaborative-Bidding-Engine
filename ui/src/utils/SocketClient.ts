import { io, Socket } from "socket.io-client";
import { Config } from "../config/config";

const socket: Socket = io(Config.SERVER_URL_TEST);
export default socket

export const SocketEvents = {
	BID_CREATED: "BidCreated",
	BID_UPDATED: "BidUpdated",
}
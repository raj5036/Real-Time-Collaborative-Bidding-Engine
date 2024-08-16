import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { SOCKET_GATEWAY_CORS_POLICY } from "src/utils/constants";

@WebSocketGateway({
	cors: SOCKET_GATEWAY_CORS_POLICY
})
export class BidderGateway {
	@WebSocketServer()
	server: any
}
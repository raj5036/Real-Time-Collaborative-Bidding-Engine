import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { BidItemService } from "./bid-item.service";
import { Body } from "@nestjs/common";
import { CreateBidDTO } from "./dto";
import { GetUser } from "src/auth/decorator";

@WebSocketGateway()
export class BidItemGateway {
	@WebSocketServer()
	server;

	constructor (private readonly bidItemService: BidItemService) {}

	@SubscribeMessage("CreateBids")
	async createBids(@Body() bid: CreateBidDTO, @GetUser('id') userId: string) {
		const response = await this.bidItemService.createBid(bid, userId);
		this.server.emit("BidCreated", response);
		return response;
	}
}
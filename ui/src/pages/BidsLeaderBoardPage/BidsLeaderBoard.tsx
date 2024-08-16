import React, { useEffect, useState } from "react";
import socket, { SocketEvents } from "../../utils/SocketClient";
import { GetAllActiveBids } from "../../utils/ApiClient";
import { IBid, ILeaderBoardRowData } from "../../utils/Types";
import { Typography } from "@mui/material";
import { PageContainer } from "./BidsLeaderBoardPageStyles";
import { CommonUtils } from "../../utils/CommonUtils";

const headCells = [
	{
		id: "id",
		numeric: true,
		label: "ID",
	},
	{
		id: "bidTitle",
		numeric: false,
		label: "Title",	
	},
	{
		id: "basePrice",
		numeric: true,
		label: "Base Price",
	},
	{
		id: "highestBidAmount",
		numeric: true,
		label: "Highest Bid Amount",
	},
	{
		id: "currentTopBidder",
		numeric: false,
		label: "Current Top Bidder",
	},
	{
		id: "seeDetailedLeaderboard",
		numeric: true,
		label: "View Details",
	}
]
const BidsLeaderBoardPage: React.FC = () => {
	const [activeBids, setActiveBids] = useState<IBid[]>([])

	useEffect(() => {
		(async () => {
			const bids = await fetchActiveBids()
			console.log("bids in useEffect", bids)
			createRowData(bids)
		})()
		socket.on(SocketEvents.BID_UPDATED, (response) => {
			console.log("Bid has been updated", response)
		})

		// fetchActiveBids()

		return () => {
			socket.off(SocketEvents.BID_UPDATED)
		}
	}, [])

	const fetchActiveBids = async () => {
		try {
			const response = await GetAllActiveBids()
			console.log(response)
			if (response.success){
				setActiveBids(response.bids)
				return response.bids
			}
		} catch(error) {
			console.log(error)
		}
	}

	const createRowData = (bids: IBid[]) => {
		return bids.map((bid: IBid, index: number) => {
			const row: ILeaderBoardRowData = {
				id: index + 1,
				bidTitle: bid.title,
				basePrice: CommonUtils.getBidBasePrice(bid),
				highestBidAmount: 100,
				currentTopBidder: "Raj",
				seeDetailedLeaderboard: bid.id
			}

			return row
		})
	}

	return (
		<PageContainer>
			<Typography variant="h3">See LeaderBoards</Typography>
			{activeBids.length}
		</PageContainer>
	)
}

export default BidsLeaderBoardPage
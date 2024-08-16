import React, { useEffect, useState } from "react";
import socket, { SocketEvents } from "../../utils/SocketClient";
import { GetAllActiveBids } from "../../utils/ApiClient";
import { IBid, ILeaderBoardRowData } from "../../utils/Types";
import { Button } from "@mui/material";
import { PageContainer } from "./BidsLeaderBoardPageStyles";
import { CommonUtils } from "../../utils/CommonUtils";
import CustomTable from "../../commonComponents/CustomTable/CustomTable";
import { useNavigate } from "react-router-dom";
import AppRoutes from "../../routes/routes";

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
	const [tableRows, setTableRows] = useState<ILeaderBoardRowData[]>([])

	useEffect(() => {
		(async () => {
			const bids = await fetchActiveBids()
			console.log("bids in useEffect", bids)
			const rows = createRowData(bids)
			setTableRows(rows)
		})()

		socket.on(SocketEvents.BID_UPDATED, (response) => {
			console.log("Bid has been updated", response)
		})

		return () => {
			socket.off(SocketEvents.BID_UPDATED)
		}
	}, [])

	const navigate = useNavigate()

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
				seeDetailedLeaderboard: (<Button 
					variant="contained"
					onClick={handleViewDetails(bid.id)}	
				>View Details</Button>)
			}

			return row
		})
	}

	const handleViewDetails = (bidId: string) => () => {
		console.log(bidId)
		navigate(AppRoutes.LEADERBOARD_DETAILS(bidId))
	}

	return (
		<PageContainer>
			{activeBids.length > 0 && (<CustomTable
				headCells={headCells}
				rows={tableRows}
				tableTitle={"See Leaderboards"}
				handleRowsDelete={() => {}}
				selectRowsEnabled={false}
				showDeleteButton={false}
			/>)}
		</PageContainer>
	)
}

export default BidsLeaderBoardPage
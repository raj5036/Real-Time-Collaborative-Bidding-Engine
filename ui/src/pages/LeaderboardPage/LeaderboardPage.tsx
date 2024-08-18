import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { GetBidByBidId } from "../../utils/ApiClient"
import { IBid } from "../../utils/Types"
import { CircularProgress, Container } from "@mui/material"
import { PageSubtitle, PageTitle } from "./LeaderboardPageStyles"
import CustomTable from "../../commonComponents/CustomTable/CustomTable"

const headCells = [
	{
		id: "rank",
		numeric: true,
		label: "Rank",
	},
	{
		id: "name",
		numeric: false,
		label: "Username",
	},
	{
		id: "bidAmount",
		numeric: true,
		label: "Bid Amount",
	}
]

type LeaderboardRowData = {
	rank: number
	name: string
	bidAmount: number
}

const LeaderboardPage: React.FC = () => {
	const [bid, setBid] = useState<IBid>({} as IBid)
	const [tableRows, settableRows] = useState<LeaderboardRowData[]>([])
	const { bidId } = useParams()

	useEffect(() => {
		if (!bidId) {
			console.error("bidId not found")
			return
		}
		(async () => {
			const bidData = await fetchBidDetails(bidId)
			createRowData(bidData)
		})()

	}, [])

	const fetchBidDetails = async (bidId: string) => {
		try {
			const response = await GetBidByBidId(bidId)
			console.log("response in fetchBidDetails", response)
			setBid(response.bid)
			return response.bid
		} catch (error) {
			console.error(error)
		} finally {
		}
	}

	const createRowData = (bid: IBid) => {
		if (!bid.currentBidders) {
			return
		}
		bid.currentBidders = bid.currentBidders.sort((a, b) => b.bidAmount - a.bidAmount)
		const rows: LeaderboardRowData[] = bid.currentBidders.map((bidder, index) => {
			return {
				rank: index + 1,
				name: bidder.user.firstname + " " + bidder.user.lastname,
				bidAmount: bidder.bidAmount
			}
		})

		console.log("rows", rows)

		settableRows(rows)
	}
	
	return (
		<Container 
			// sx={{height: "100vh"}}
		>	{!bid.bidCreator ? <CircularProgress /> :
			<React.Fragment>
				<PageTitle variant="h4">Leaderboard for Bid <span className="bid-title">#{bid.title}</span></PageTitle>
				<PageSubtitle variant="caption">
					This bid started on <span className="start">{bid.startDate + " "}</span> at 
					<span className="start">{" "+ bid.startTime}</span> and 
					scheduled to end on <span className="end">{bid.endDate}</span> at 
					<span className="end">{" "+ bid.endTime}</span>
				</PageSubtitle>
				<PageSubtitle variant="caption" sx={{display: "block"}}>
					This bid was created by {bid.bidCreator.firstname + " " + bid.bidCreator.lastname}
				</PageSubtitle>
				<CustomTable
					headCells={headCells}
					rows={tableRows}
					tableTitle={""}
					showDeleteButton={false}
					selectRowsEnabled={false}
					handleRowsDelete={() => {}}
				/>
			</React.Fragment>}
		</Container>
	)
}

export default LeaderboardPage
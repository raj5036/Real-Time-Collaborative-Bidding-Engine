import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { GetBidByBidId } from "../../utils/ApiClient"
import { IBid } from "../../utils/Types"
import { Container } from "@mui/material"
import { PageSubtitle, PageTitle } from "./LeaderboardPageStyles"

const LeaderboardPage: React.FC = () => {
	const [bid, setBid] = useState<IBid>({} as IBid)
	const { bidId } = useParams()

	useEffect(() => {
		if (!bidId) {
			console.error("bidId not found")
			return
		}

		fetchBidDetails(bidId)
	}, [])

	const fetchBidDetails = async (bidId: string) => {
		try {
			const response = await GetBidByBidId(bidId)
			console.log(response)
			setBid(response.bid)
		} catch (error) {
			console.error(error)
		}
	}
	
	return (
		<Container 
			// sx={{height: "100vh"}}
		>
			<PageTitle variant="h4">Leaderboard for Bid #{bid.title}</PageTitle>
			<PageSubtitle variant="caption" className="page-subtitle">
				This bid started on <span className="start">{bid.startDate + " "}</span> at 
				<span className="start">{" "+ bid.startTime}</span> and 
				scheduled to end on <span className="end">{bid.endDate}</span> at 
				<span className="end">{" "+ bid.endTime}</span>
			</PageSubtitle>
		</Container>
	)
}

export default LeaderboardPage
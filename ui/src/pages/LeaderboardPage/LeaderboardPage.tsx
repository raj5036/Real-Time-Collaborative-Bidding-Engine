import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { GetBidByBidId } from "../../utils/ApiClient"

const LeaderboardPage: React.FC = () => {
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
		} catch (error) {
			console.error(error)
		}
	}
	
	return (
		<React.Fragment>
			Leaderboard Page - {bidId}
		</React.Fragment>
	)
}

export default LeaderboardPage
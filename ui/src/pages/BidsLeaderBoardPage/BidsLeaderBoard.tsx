import React, { useEffect } from "react";
import socket, { SocketEvents } from "../../utils/SocketClient";
import { GetAllActiveBids } from "../../utils/ApiClient";

const BidsLeaderBoardPage: React.FC = () => {
	useEffect(() => {
		console.log("inside BidsLeaderBoardPage")
		socket.on(SocketEvents.BID_UPDATED, (response) => {
			console.log("Bid has been updated", response)
		})

		fetchActiveBids()

		return () => {
			socket.off(SocketEvents.BID_UPDATED)
		}
	}, [])

	const fetchActiveBids = async () => {
		try {
			const response = await GetAllActiveBids()
			console.log(response)
		} catch(error) {
			console.log(error)
		}
	}

	return (
		<React.Fragment>
			Bids Leader Board
		</React.Fragment>
	)
}

export default BidsLeaderBoardPage
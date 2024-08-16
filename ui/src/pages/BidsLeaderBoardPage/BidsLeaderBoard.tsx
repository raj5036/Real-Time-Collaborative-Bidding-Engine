import React, { useEffect } from "react";
import socket, { SocketEvents } from "../../utils/SocketClient";

const BidsLeaderBoardPage: React.FC = () => {
	useEffect(() => {
		console.log("inside BidsLeaderBoardPage")
		socket.on(SocketEvents.BID_UPDATED, (response) => {
			console.log("Bid has been updated", response)
		})

		return () => {
			socket.off(SocketEvents.BID_UPDATED)
		}
	}, [])

	return (
		<React.Fragment>
			Bids Leader Board
		</React.Fragment>
	)
}

export default BidsLeaderBoardPage
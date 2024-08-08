import React, { useEffect, useState } from "react"
import { Badge } from "@mui/material"
import { CustomNotificationsIcon } from "./NotificationStyles"
import socket, { SocketEvents } from "../../utils/SocketClient"


const Notification: React.FC = () => {
	const [bidsCreateCount, setBidsCreateCount] = useState<number>(1)

	useEffect(() => {
		socket.on(SocketEvents.BID_CREATED, (response) => {
			console.log("response in notification", response)
		})

		return () => {
			socket.off(SocketEvents.BID_CREATED)
		}
	}, [])

	const handleIconClick = () => {
		console.log("handleIconClick called")
	}
	
	return (
		<React.Fragment>
			<Badge badgeContent={bidsCreateCount} color="primary">
				<CustomNotificationsIcon color="action" onClick={handleIconClick}/>
			</Badge>
		</React.Fragment>
	)
}

export default Notification
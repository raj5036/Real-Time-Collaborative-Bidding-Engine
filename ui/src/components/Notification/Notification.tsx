import React, { useEffect, useRef, useState } from "react"
import { Badge } from "@mui/material"
import { CustomNotificationsIcon } from "./NotificationStyles"
import socket, { SocketEvents } from "../../utils/SocketClient"
import { IBid } from "../../utils/Types"
import NotificationPopper from "../NotificationPopper/NotificationPopper"


const Notification: React.FC = () => {
	const [newBids, setNewBids] = useState<IBid[]>([
		{
			title: "test1",
			startTime: "2014-08-18 21:11:54",
			endTime: "2014-08-18 21:11:54",
			bidItems: [
				{
					title: "item 1",
					price: 0
				}
			]
		},
		{
			title: "test2",
			startTime: "2014-08-18 21:11:54",
			endTime: "2014-08-18 21:11:54",
			bidItems: [
				{
					title: "item 1",
					price: 0
				}
			]
		}
	])
	const [popperOpen, setPopperOpen] = useState<boolean>(false)
	const [anchorEl, setAnchorEl] = useState(document.body)
	const notificationIconRef = useRef<HTMLElement>(null)

	useEffect(() => {
		socket.on(SocketEvents.BID_CREATED, (response) => {
			console.log("response in notification", response)
			setNewBids(prevState => [...prevState, response.newBid])
		})

		return () => {
			socket.off(SocketEvents.BID_CREATED)
		}
	}, [])

	const handleIconClick = (e: any) => {
		console.log("handleIconClick called", e)
		setPopperOpen(!popperOpen)
		// setPopperOpen(prevState => {
		// 	setAnchorEl(e.currentTarget)
		// 	return !prevState
		// })
	}

	const handleAcceptNewBid = (bid: IBid) => {
		console.log("handleAcceptNewBid called", bid)
		setPopperOpen(false)
	}
	
	return (
		<React.Fragment>
			<Badge badgeContent={newBids.length} color="primary">
				<CustomNotificationsIcon 
					color="action" 
					ref={notificationIconRef}
					onClick={e => handleIconClick(e)} 
				/>
			</Badge>
			<NotificationPopper 
				open={popperOpen} 
				anchorEl={notificationIconRef.current as HTMLElement}
				newBids={newBids}
				handleAcceptNewBid={handleAcceptNewBid}
			/>
		</React.Fragment>
	)
}

export default Notification
import React, { useEffect, useRef, useState } from "react"
import { Badge } from "@mui/material"
import { CustomNotificationsIcon } from "./NotificationStyles"
import socket, { SocketEvents } from "../../utils/SocketClient"
import { IBid } from "../../utils/Types"
import NotificationPopper from "../NotificationPopper/NotificationPopper"
import { useNavigate } from "react-router-dom"
import AppRoutes from "../../routes/routes"
import { AcceptBidRequest } from "../../utils/ApiClient"
import { toast } from "react-toastify"
import { API_ERROR_MESSAGES } from "../../utils/Constants"


const Notification: React.FC = () => {
	const [newBids, setNewBids] = useState<IBid[]>([
		// {
		// 	title: "test1",
		// 	startTime: "2014-08-18 21:11:54",
		// 	endTime: "2014-08-18 21:11:54",
		// 	bidItems: [
		// 		{
		// 			title: "item 1",
		// 			price: 0
		// 		}
		// 	]
		// },
		// {
		// 	title: "test2",
		// 	startTime: "2014-08-18 21:11:54",
		// 	endTime: "2014-08-18 21:11:54",
		// 	bidItems: [
		// 		{
		// 			title: "item 1",
		// 			price: 0
		// 		}
		// 	]
		// }
	])
	const [popperOpen, setPopperOpen] = useState<boolean>(false)
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

	const navigate = useNavigate()

	const handleIconClick = () => {
		setPopperOpen(!popperOpen)
	}

	const handleAcceptNewBid = async (bid: IBid) => {
		console.log("handleAcceptNewBid called", bid)
		try {
			const result = await AcceptBidRequest(bid.id)
			if (result.success) {
				toast.success(result.message)
			} else {
				toast.error(result.message || API_ERROR_MESSAGES.INTERNAL_SERVER_ERROR)
				return
			}
		} catch (error) {
			console.error(error)
		} finally {
			setNewBids((prevBids: IBid[]) => {
				setPopperOpen(false)
				return prevBids.filter((prevBid: IBid) => prevBid.id !== bid.id)
			})
			navigate(AppRoutes.USER_CURRENT_BIDS)
		}
	}
	
	return (
		<React.Fragment>
			<Badge badgeContent={newBids.length} color="primary">
				<CustomNotificationsIcon 
					color="action" 
					ref={notificationIconRef}
					onClick={handleIconClick} 
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
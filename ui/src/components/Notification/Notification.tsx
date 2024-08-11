import React, { useContext, useEffect, useRef, useState } from "react"
import { Alert, Badge, Snackbar } from "@mui/material"
import { CustomNotificationsIcon } from "./NotificationStyles"
import socket, { SocketEvents } from "../../utils/SocketClient"
import { IBid } from "../../utils/Types"
import NotificationPopper from "../NotificationPopper/NotificationPopper"
import { useLocation, useNavigate } from "react-router-dom"
import AppRoutes from "../../routes/routes"
import { AcceptBidRequest } from "../../utils/ApiClient"
import { toast } from "react-toastify"
import { API_ERROR_MESSAGES } from "../../utils/Constants"


const Notification: React.FC = () => {
	const [newBids, setNewBids] = useState<IBid[]>([])
	const [popperOpen, setPopperOpen] = useState<boolean>(false)
	const [showRefreshSnackbar, setShowRefreshSnackbar] = useState<boolean>(false)
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
	const location = useLocation()

	const handleIconClick = () => {
		setPopperOpen(!popperOpen)
	}

	const handleAcceptNewBid = async (bid: IBid) => {
		try {
			const result = await AcceptBidRequest(bid.id)
			if (result.success) {
				setShowRefreshSnackbar(true)
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

	const handleSnackbarClose = () => {
		setShowRefreshSnackbar(false)
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
			{location.pathname === AppRoutes.USER_CURRENT_BIDS &&	
				<Snackbar open={showRefreshSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
					<Alert
						onClose={handleSnackbarClose}
						severity="success"
						variant="filled"
						sx={{ width: '100%' }}
					>
						Please refresh the page to see new changes
					</Alert>
			</Snackbar>}
		</React.Fragment>
	)
}

export default Notification
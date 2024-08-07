import { Box, Drawer, List, ListItem, ListItemText } from "@mui/material"
import React, { useContext } from "react"
import { IUserContext } from "../../context/UserContext/Types"
import { UserContext } from "../../context/UserContext/UserContext"
import { USER_TYPES } from "../../utils/Constants"
import SidebarContext from "../../context/SidebarContext/SidebarContext"
import { ISideBarContext } from "../../context/SidebarContext/Types"


const Sidebar: React.FC = () => {
	const { user } = useContext(UserContext) as IUserContext
	const { sidebarOpen, setSidebarOpen } = useContext(SidebarContext) as ISideBarContext

	const drawerItems = user.role === USER_TYPES.BID_CREATOR ? [
		"Create Bid",
		"View Bids Leaderboard",
	]: [
		"View Bids Leaderboard",
		"Place Bids"
	]

	const toggleDrawerOpen = () => {
		setSidebarOpen(!sidebarOpen)
	}

	return (
		<Drawer open={sidebarOpen} onClose={toggleDrawerOpen}>
			<Box sx={{ width: 250 }} role="presentation">
				<List>
					{drawerItems.map((text, index) => (
						<ListItem key={text + index} disablePadding>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
			</Box>
		</Drawer>
	)
}

export default Sidebar
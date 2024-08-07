import { Drawer, List, ListItem, ListItemText } from "@mui/material"
import React, { useContext } from "react"
import { IUserContext } from "../../context/UserContext/Types"
import { UserContext } from "../../context/UserContext/UserContext"
import { USER_TYPES } from "../../utils/Constants"
import SidebarContext from "../../context/SidebarContext/SidebarContext"
import { ISideBarContext } from "../../context/SidebarContext/Types"
import { DrawerItemsContainer } from "./SidebarStyles"
import { Link } from "react-router-dom"
import AppRoutes from "../../routes/routes"


const Sidebar: React.FC = () => {
	const { user } = useContext(UserContext) as IUserContext
	const { sidebarOpen, setSidebarOpen } = useContext(SidebarContext) as ISideBarContext

	const drawerItems = user.role === USER_TYPES.BID_CREATOR ? [
		{text: "Create Bid", link: AppRoutes.CREATE_BID},
		{text: "View Bids Leaderboard", link: AppRoutes.BIDS_LEADERBOARD},
	]: [
		{text: "Create Bid", link: "/create-bid"},
		{text: "View Bids Leaderboard", link: "/bids-leaderboard"},
	]

	const toggleDrawerOpen = () => {
		setSidebarOpen(!sidebarOpen)
	}

	return (
		<Drawer open={sidebarOpen} onClose={toggleDrawerOpen}>
			<DrawerItemsContainer role="presentation">
				<List>
					{drawerItems.map((item, index) => (
						<ListItem key={item.text + index} className="list-item">
							<ListItemText className="list-item-text">
								<Link to={item.link}>{item.text}</Link>
							</ListItemText>
						</ListItem>
					))}
				</List>
			</DrawerItemsContainer>
		</Drawer>
	)
}

export default Sidebar
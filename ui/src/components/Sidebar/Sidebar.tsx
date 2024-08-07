import { Box, Drawer, List, ListItem, ListItemText } from "@mui/material"
import React, { useContext } from "react"
import { IUserContext } from "../../context/UserContext/Types"
import { UserContext } from "../../context/UserContext/UserContext"
import { USER_TYPES } from "../../utils/Constants"

type ComponentProps = {
	open: boolean,
	onClose: () => void,
}

const Sidebar: React.FC<ComponentProps> = ({ open, onClose }) => {
	const { user } = useContext(UserContext) as IUserContext

	const drawerItems = user.role === USER_TYPES.BID_CREATOR ? [
		"Create Bid",
		"View Bids Leaderboard",
	]: [
		"View Bids Leaderboard",
		"Place Bids"
	]

	return (
		<React.Fragment>
			<Drawer open={open} onClose={onClose}>
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
		</React.Fragment>
	)
}

export default Sidebar
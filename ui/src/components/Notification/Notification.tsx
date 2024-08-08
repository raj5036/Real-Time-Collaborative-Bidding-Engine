import React from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge } from "@mui/material";


const Notification: React.FC = () => {
	return (<React.Fragment>
		<Badge badgeContent={4} color="primary">
			<NotificationsIcon color="action"/>
		</Badge>
	</React.Fragment>)
}

export default Notification
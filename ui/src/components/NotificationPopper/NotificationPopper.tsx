import { Box, Divider, Fade, List, ListItem, Paper, Popper, Stack, Typography } from "@mui/material";
import React from "react";
import { IBid } from "../../utils/Types";
import { CommonUtils } from "../../utils/CommonUtils";

type ComponentProps = {
	open: boolean,
	anchorEl: HTMLElement,
	newBids: IBid[],
}

const NotificationPopper: React.FC<ComponentProps> = ({ open, anchorEl, newBids }) => {
	return (
		<Popper
			sx={{ zIndex: 1200 }}
			open={open}
			anchorEl={anchorEl}
			placement={"bottom"}
			transition
      >
		{({ TransitionProps }) => (
			<Fade {...TransitionProps} timeout={350}>
				<Paper>
					<Typography sx={{ p: 2 }}>New Bids created for You!</Typography>
					<List>
						{newBids.map((bid, index) => (
							<React.Fragment key={bid.title + index + "parent"}>
								<ListItem key={bid.title + index + "list-item"}>
									<Stack direction={"column"} spacing={1}>
										<Box>
											<Typography variant="body1">Your bid for </Typography>
											<Typography variant="body2" className="bid-title">{bid.title}</Typography>
										</Box>
										<Typography variant="caption" className="bid-title">
											Bid end on 
											{" " + CommonUtils.parseDate(bid.endTime) + " "} 
											at {" " + CommonUtils.parseTime(bid.endTime)}, 
											Hurry up!
										</Typography>
									</Stack>
								</ListItem>
								{index !== newBids.length - 1 && <Divider key={bid.title + index + "divider"}/>}
							</React.Fragment>
						))}
					</List>
				</Paper>
			</Fade>
        )}
      </Popper>
	)
}

export default NotificationPopper
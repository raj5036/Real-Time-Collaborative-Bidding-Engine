import { Box, Button, capitalize, Divider, Fade, List, ListItem, Popper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { IBid } from "../../utils/Types";
import { CommonUtils } from "../../utils/CommonUtils";
import { PopperPaperWrapper } from "./NotificationPopperStyles";

type ComponentProps = {
	open: boolean,
	anchorEl: HTMLElement,
	newBids: IBid[],
	handleAcceptNewBid: (bid: IBid) => void
}

const NotificationPopper: React.FC<ComponentProps> = ({ open, anchorEl, newBids, handleAcceptNewBid }) => {
	const [showAcceptButton, setShowAcceptButton] = useState<any>({})


	const handleListMouseEnter = (index: number) => () => {
		setShowAcceptButton((prevState: any) => {
			return {...prevState, [index]: true}
		})
	}
	const handleListMouseLeave = (index: number) => () => {
		setShowAcceptButton((prevState: any) => {
			return {...prevState, [index]: false}
		})
	}

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
				<PopperPaperWrapper>
					<Typography className="popper-title">New Bids created for You!</Typography>
					<List className="popper-list">
						{newBids.map((bid, index) => (
							<Box 
								key={bid.title + index + "parent"} 
								className="popper-list-item"
								onMouseEnter={handleListMouseEnter(index)}
								onMouseLeave={handleListMouseLeave(index)}
							>
								<ListItem key={bid.title + index + "list-item"}>
									<Stack direction={"column"}>
										<Stack direction={"row"} spacing={1} alignItems={"center"}>
											<Typography variant="body1">Start your bid for </Typography>
											<Typography 
												variant="body2" 
												fontWeight={700} 
												className="bid-title"
											>
												{capitalize(bid.title)}
											</Typography>
										</Stack>
										<Typography variant="caption">
											Bid end on 
											{" " + CommonUtils.parseDate(bid.endTime) + " "} 
											at {" " + CommonUtils.parseTime(bid.endTime)}, 
											Hurry up!
										</Typography>
										{showAcceptButton[index] && <Button
											className="accept-btn"
											variant="contained"
											size="small"
											color="success"
											onClick={() => handleAcceptNewBid(bid)}
										>Accept</Button>}
									</Stack>
								</ListItem>
								{index !== newBids.length - 1 && <Divider key={bid.title + index + "divider"}/>}
							</Box>
						))}
					</List>
				</PopperPaperWrapper>
			</Fade>
        )}
      </Popper>
	)
}

export default NotificationPopper
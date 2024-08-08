import { Fade, Paper, Popper, Typography } from "@mui/material";
import React from "react";

type ComponentProps = {
	open: boolean,
	anchorEl: HTMLElement
}

const NotificationPopper: React.FC<ComponentProps> = ({ open, anchorEl }) => {
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
              <Typography sx={{ p: 2 }}>The content of the Popper.</Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
	)
}

export default NotificationPopper
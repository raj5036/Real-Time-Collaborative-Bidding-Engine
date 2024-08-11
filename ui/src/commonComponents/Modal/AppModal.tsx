import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import React from "react";

type ComponentProps = {
	open: boolean,
	handleClose: () => void
}

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export const AppModal: React.FC<ComponentProps> = ({ open, handleClose }) => {
	return (
		<React.Fragment>
			 <Modal
				aria-labelledby="app-modal-title"
				aria-describedby="app-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}
			>
				<Fade in={open}>
				<Box sx={style}>
					<Typography id="transition-modal-title" variant="h6" component="h2">
						Text in a modal
					</Typography>
					
				</Box>
				</Fade>
		</Modal>
		</React.Fragment>
	)
}

export default AppModal
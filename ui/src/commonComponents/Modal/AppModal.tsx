import { Backdrop, Box, Fade, Modal } from "@mui/material";
import React from "react";

type ComponentProps = {
	open: boolean,
	handleClose: () => void,
	children: React.ReactNode
}

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '1px solid #000',
	boxShadow: 24,
	p: 4,
};

export const AppModal: React.FC<ComponentProps> = ({ open, handleClose, children }) => {
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
						{children}
					</Box>
				</Fade>
		</Modal>
		</React.Fragment>
	)
}

export default AppModal
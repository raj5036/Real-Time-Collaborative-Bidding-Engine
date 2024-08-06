import { Box } from "@mui/material";
import { styled } from '@mui/material/styles'; 

export const ToggleColorModeStyles = {
	Box: styled(Box)(({ theme }) => ({
		color: theme.palette.text.primary,
		backgroundColor: theme.palette.background.default,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: theme.spacing(3),

		[theme.breakpoints.down('sm')]: {
			marginRight: theme.spacing(1),
		}
	}))
}
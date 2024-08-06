import { Box } from "@mui/material";
import {styled} from "@mui/material/styles";

export const AppStyles = {
	Container: styled(Box)(({ theme }) => ({
		color: theme.palette.text.primary,
		backgroundColor: theme.palette.background.default,
	}))
}
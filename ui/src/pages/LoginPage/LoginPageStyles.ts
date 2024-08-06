import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const LoginController = styled(Box)(({ theme }) => `
	margin-top: ${theme.spacing(1)};
	display: flex;
	flex-direction: column;
	align-items: center;
`)
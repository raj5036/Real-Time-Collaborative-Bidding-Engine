import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const HomePageContainer = styled(Box)(({ theme }) => `
	margin-top: ${theme.spacing(10)};
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100vh;
`)
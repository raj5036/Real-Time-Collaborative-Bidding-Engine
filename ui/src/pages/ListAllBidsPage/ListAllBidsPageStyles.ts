import { Box, List } from "@mui/material";
import { styled } from "@mui/material/styles";

export const MainContainer = styled(Box)(() => `
	text-align: center;
`)

export const ListContainer = styled(List)(({ theme }) => `
	margin-top: ${theme.spacing(5)};
`)
import { Box, Container } from "@mui/material";
import { styled } from "@mui/material/styles";

export const BidCreatorContainer = styled(Container)(({ theme }) => `
	margin-top: ${theme.spacing(2)};
	display: flex;
	flex-direction: column;
	align-items: center;

	& .title-input {
		margin-top: ${theme.spacing(2)};
	}
`)

export const BidItemsContainer = styled(Box)(({ theme }) => `
	margin-top: ${theme.spacing(2)};
	margin-bottom: ${theme.spacing(2)};
`)

export const SetTimer = styled(Box)(({ theme }) => `
	margin: ${theme.spacing(2)} 0;
`)
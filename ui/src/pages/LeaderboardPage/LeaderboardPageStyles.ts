import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const PageTitle = styled(Typography)(({ theme }) => `
	margin-bottom: ${theme.spacing(1)};
`)

export const PageSubtitle = styled(Typography)(({theme}) => `
	& .start {
		color: ${theme.palette.text.success};
		font-weight: bold;
	}
		
	& .end {
		color: ${theme.palette.text.error};
		font-weight: bold;
	}
`)
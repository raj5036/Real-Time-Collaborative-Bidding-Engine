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
	padding: ${theme.spacing(2)} ${theme.spacing(4)};
	text-align: center;
	border: 1px solid ${theme.palette.divider};
	border-radius: ${theme.spacing(2)};
	box-shadow: 0 1px 3px 0 ${theme.palette.divider};
	max-height: ${theme.spacing(40)};
	overflow-y: scroll;

	& .bids-container {
		margin-top: ${theme.spacing(3)};
	}

	& .bid-input-container {
		margin: ${theme.spacing(3)} 0;

		& .MuiButtonBase-root:disabled {
  			cursor: not-allowed;
  			pointer-events: auto;
		}
	}
`)

export const SetTimer = styled(Box)(({ theme }) => `
	margin: ${theme.spacing(2)} 0;
`)

export const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
  });
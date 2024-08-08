import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const PopperPaperWrapper = styled(Paper)(({ theme }) => `
	& .popper-title {
		padding: ${theme.spacing(1)} ${theme.spacing(2)};
		color: ${theme.palette.text.primary};
		background-color: ${theme.palette.bgColor.secondary};
		font-weight: bold;
	}

	& .popper-list {
		margin: 0;
		padding: 0;

		& .popper-list-item {
			cursor: pointer;
			&:hover {
				background-color: ${theme.palette.bgColor.primary};
			}

			& .accept-btn {
				margin-top: ${theme.spacing(1.4)};
			}
		}
	}
`)
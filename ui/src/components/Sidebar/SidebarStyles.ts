import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const DrawerItemsContainer = styled(Box)(({ theme }) => `
	width: ${theme.spacing(30)};

	& .list-item {
		cursor: pointer;

		&:hover {
			background-color: ${theme.palette.bgColor.primary};
			
			a {
				color: ${theme.palette.primary.main};
			}
		}
	}

	& .list-item-text {
		& a {
			text-decoration: none;
			color: ${theme.palette.text.primary};
		}
	}
`)
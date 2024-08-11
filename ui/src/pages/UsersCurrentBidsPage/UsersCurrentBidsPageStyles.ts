import { Box } from "@mui/material"
import { styled } from "@mui/material/styles"

export const PageContainer = styled(Box)(({ theme }) => `
	margin-top: ${theme.spacing(0)};
	text-align: center;
`)

export const TableWrapper = styled(Box)(({ theme }) => `
	margin-top: ${theme.spacing(0)};
`)

export const ModalContainer = styled(Box)(({ theme }) => `
	margin-top: ${theme.spacing(0)};

	& .modal-title {
		font-weight: bold;
		 
		& .bid-title {
			color: ${theme.palette.primary.dark};
		}
	}
`)
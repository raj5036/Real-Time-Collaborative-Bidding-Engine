import BorderColorIcon from '@mui/icons-material/BorderColor'
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

	& .modal-header {
		font-weight: bold;
		margin-bottom: ${theme.spacing(1.5)};
		 
		& .bid-title {
			color: ${theme.palette.primary.dark};
		}
	}

	& .bid-items-header {
		margin-bottom: ${theme.spacing(1.5)};
	}

	& .bid-amount-container {
		margin-top: ${theme.spacing(1.5)};

		& .bid-amount-header {
			margin-bottom: ${theme.spacing(1.5)};
		}
	}

	& .buttons {
		margin-top: ${theme.spacing(3.5)};

		& .cancel {
			height: ${theme.spacing(5)};
			width: ${theme.spacing(10)};
		}
	}
`)

export const EditBidIcon = styled(BorderColorIcon)(({ theme }) => `
	:hover {
		color: ${theme.palette.primary.dark};
	}
`)
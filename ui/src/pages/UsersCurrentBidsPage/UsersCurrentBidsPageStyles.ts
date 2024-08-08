import { Box } from "@mui/material"
import { styled } from "@mui/material/styles"

export const PageContainer = styled(Box)(({ theme }) => `
	margin-top: ${theme.spacing(0)};
	text-align: center;
`)

export const TableWrapper = styled(Box)(({ theme }) => `
	margin-top: ${theme.spacing(0)};
`)
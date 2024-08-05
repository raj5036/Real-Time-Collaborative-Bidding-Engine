import { Box, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const SignupFormContainer = styled(Box)(({ theme }) => {
	console.log(theme)
	return `
		margin-top: ${theme.spacing(1)};
		display: flex;
		flex-direction: column;
		align-items: center;
	`
})

export const RoleSelector = styled(TextField)(({theme}) => `
	margin-left: 0;

	& .MuiInputBase-root {
		width: ${theme.spacing(31)};
	}
`)
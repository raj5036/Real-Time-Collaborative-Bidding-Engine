import { PaletteMode } from "@mui/material";
import { amber, green, grey } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface TypeText {
		success: string,
		info: string,
  }
}

const Theme = (mode: PaletteMode) => ({
	palette: {
		mode,
		...(mode === 'light'
		? {
			// palette values for light mode
			primary: amber,
			divider: grey[700],
			text: {
				primary: grey[900],
				secondary: grey[800],
				success: green['A700'],
				info: '#ed6c02',
			},
		}
		: {
			// palette values for dark mode
			primary: grey,
			divider: grey[300],
			background: {
				default: grey[900],
				paper: grey[900],
			},
			text: {
				primary: grey[50],
				secondary: grey[500],
				success: green['A400'],
				info: '#29b6f6',
			},
		}),
	},
  });

  export default Theme
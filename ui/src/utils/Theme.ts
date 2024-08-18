import { PaletteMode } from "@mui/material";
import { amber, blue, green, grey, red } from "@mui/material/colors";

declare module "@mui/material/styles" {
	interface Palette {
		bgColor: {
			primary: string;
			secondary: string;
		};
	}
	interface PaletteOptions {
		bgColor?: {
			primary?: string;
			secondary?: string;
		};
	}
  interface TypeText {
		success: string,
		info: string,
		error: string,
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
				error: red['A400'],
				info: '#ed6c02',
			},
			bgColor: {
				primary: grey['100'],
				secondary: amber['400'],
			}
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
				primary: "#fff",
				secondary: grey[500],
				success: green['A400'],
				error: red['A400'],
				info: blue[400],
			},
			bgColor: {
				primary: '#fff',
				secondary: blue['400'],
			}
		}),
	},
  });

  export default Theme
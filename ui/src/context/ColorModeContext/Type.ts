import { PaletteMode } from "@mui/material"

export type ColorModeContextType = {
	colorMode: PaletteMode
	setColorMode: React.Dispatch<React.SetStateAction<PaletteMode>>
}
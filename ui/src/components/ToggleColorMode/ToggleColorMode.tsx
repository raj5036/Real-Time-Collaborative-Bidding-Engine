import { useTheme } from "@mui/material/styles";
import React from "react";
import { IconButton } from "@mui/material";
import { ToggleColorModeStyles } from "./ToggleColorModeStyles";
import NightsStayIcon from '@mui/icons-material/NightsStay';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { ColorModeContextType } from "../../context/ColorModeContext/Type";
import ColorModeContext from "../../context/ColorModeContext/ColorModeContext";

const ToggleColorMode = () => {
	const theme = useTheme();
	const {colorMode, setColorMode} = React.useContext(ColorModeContext) as ColorModeContextType;
	return (
		<ToggleColorModeStyles.Box>
			<IconButton sx={{ ml: 1 }} onClick={() => setColorMode(
				colorMode === 'light' ? 'dark' : 'light'
			)} color="inherit">
				{theme.palette.mode === 'dark' 
				? <NightsStayIcon color="info"/> 
				: <WbSunnyIcon color="warning"/>}
			</IconButton>
		</ToggleColorModeStyles.Box>
	)
}

export default ToggleColorMode
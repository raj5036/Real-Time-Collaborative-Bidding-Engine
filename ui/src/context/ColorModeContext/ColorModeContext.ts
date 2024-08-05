import React from "react";
import { ColorModeContextType } from "./Type";

const ColorModeContext = React.createContext<ColorModeContextType>({
	colorMode: "light",
	setColorMode: () => {},
})

export default ColorModeContext
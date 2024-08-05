import React, { PropsWithChildren, useState } from "react";
import ColorModeContext from "./ColorModeContext";
import { PaletteMode } from "@mui/material";

const ColorModeContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [colorMode, setColorMode] = useState<PaletteMode>("light");

  return (
    <ColorModeContext.Provider value={{ colorMode, setColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
};

export default ColorModeContextProvider;

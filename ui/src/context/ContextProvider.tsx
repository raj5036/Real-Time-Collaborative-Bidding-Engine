import { PropsWithChildren } from "react";
import ColorModeContextProvider from "./ColorModeContext/ColorModeContextProvider";

export const ContextProviders: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<ColorModeContextProvider>
			{children}
		</ColorModeContextProvider>
	)
}
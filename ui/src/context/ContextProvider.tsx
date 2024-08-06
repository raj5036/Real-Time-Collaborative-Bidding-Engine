import { PropsWithChildren } from "react";
import ColorModeContextProvider from "./ColorModeContext/ColorModeContextProvider";
import UserContextProvider from "./UserContext/UserContextProvider";

export const ContextProviders: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<ColorModeContextProvider>
			<UserContextProvider>
				{children}
			</UserContextProvider>
		</ColorModeContextProvider>
	)
}
import { PropsWithChildren } from "react";
import ColorModeContextProvider from "./ColorModeContext/ColorModeContextProvider";
import UserContextProvider from "./UserContext/UserContextProvider";
import SidebarContextProvider from "./SidebarContext/SidebarContextProvider";

export const ContextProviders: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<ColorModeContextProvider>
			<UserContextProvider>
				<SidebarContextProvider>
					{children}
				</SidebarContextProvider>
			</UserContextProvider>
		</ColorModeContextProvider>
	)
}
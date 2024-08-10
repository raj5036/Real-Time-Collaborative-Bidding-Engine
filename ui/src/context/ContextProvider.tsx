import { PropsWithChildren } from "react";
import ColorModeContextProvider from "./ColorModeContext/ColorModeContextProvider";
import UserContextProvider from "./UserContext/UserContextProvider";
import SidebarContextProvider from "./SidebarContext/SidebarContextProvider";
import BidderActiveBidsContextProvider from "./BidderActiveBids/BidderActiveBidsContextProvider";

export const ContextProviders: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<ColorModeContextProvider>
			<UserContextProvider>
				<BidderActiveBidsContextProvider>
					<SidebarContextProvider>
						{children}
					</SidebarContextProvider>
				</BidderActiveBidsContextProvider>
			</UserContextProvider>
		</ColorModeContextProvider>
	)
}
import { PropsWithChildren, useState } from "react";
import SidebarContext from "./SidebarContext";

const SidebarContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
	
	return (
		<SidebarContext.Provider value={{sidebarOpen, setSidebarOpen}}>
			{children}
		</SidebarContext.Provider>
	)
}

export default SidebarContextProvider
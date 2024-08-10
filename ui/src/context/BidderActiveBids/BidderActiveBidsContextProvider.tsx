import { PropsWithChildren, useState } from "react";
import BidderActiveBidsContext from "./BidderActiveBidsContext";
import { IBid } from "../../utils/Types";

const BidderActiveBidsContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [activeBids, setActiveBids] = useState<IBid[]>([] as IBid[])
	
	return (
		<BidderActiveBidsContext.Provider value={{activeBids, setActiveBids}}>
			{children}
		</BidderActiveBidsContext.Provider>
	)
}

export default BidderActiveBidsContextProvider
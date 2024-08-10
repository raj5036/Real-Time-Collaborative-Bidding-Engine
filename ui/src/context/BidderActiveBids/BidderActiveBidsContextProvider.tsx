import { PropsWithChildren, useState } from "react";
import BidderActiveBidsContext from "./BidderActiveBidsContext";
import { ActiveBid } from "../../utils/Types";

const BidderActiveBidsContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [activeBids, setActiveBids] = useState<ActiveBid[]>([] as ActiveBid[])
	
	return (
		<BidderActiveBidsContext.Provider value={{activeBids, setActiveBids}}>
			{children}
		</BidderActiveBidsContext.Provider>
	)
}

export default BidderActiveBidsContextProvider
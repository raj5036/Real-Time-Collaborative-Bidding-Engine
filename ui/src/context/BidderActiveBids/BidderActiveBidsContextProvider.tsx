import { PropsWithChildren, useState } from "react";
import BidderActiveBidsContext from "./BidderActiveBidsContext";
import { IActiveBid } from "../../utils/Types";

const BidderActiveBidsContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [activeBids, setActiveBids] = useState<IActiveBid[]>([] as IActiveBid[])
	
	return (
		<BidderActiveBidsContext.Provider value={{activeBids, setActiveBids}}>
			{children}
		</BidderActiveBidsContext.Provider>
	)
}

export default BidderActiveBidsContextProvider
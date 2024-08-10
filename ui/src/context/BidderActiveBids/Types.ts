import { ActiveBid } from "../../utils/Types"

export type IBidderActiveBidsContextType = {
	activeBids: ActiveBid[];
	setActiveBids: React.Dispatch<React.SetStateAction<ActiveBid[]>>;
}
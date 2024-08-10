import { IBid } from "../../utils/Types"

export type IBidderActiveBidsContextType = {
	activeBids: IBid[];
	setActiveBids: React.Dispatch<React.SetStateAction<IBid[]>>;
}
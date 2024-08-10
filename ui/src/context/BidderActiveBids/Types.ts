import { IActiveBid } from "../../utils/Types"

export type IBidderActiveBidsContextType = {
	activeBids: IActiveBid[];
	setActiveBids: React.Dispatch<React.SetStateAction<IActiveBid[]>>;
}
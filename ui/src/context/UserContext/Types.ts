import { IUser } from "../../utils/Types"


export type IUserContext = {
	user: IUser,
	setUser: React.Dispatch<React.SetStateAction<IUser>>
}
import { UserType } from "../../utils/Types"

export type IUser = {
	id: string,
	email: string,
	firstname: string,
	lastname: string,
	role: UserType
}

export type IUserContext = {
	user: IUser,
	setUser: React.Dispatch<React.SetStateAction<IUser>>
}
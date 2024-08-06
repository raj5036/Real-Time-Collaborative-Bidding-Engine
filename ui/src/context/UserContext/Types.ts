export type IUser = {
	id: string,
	email: string,
	firstname: string,
	lastname: string,
	role: string
}

export type IUserContext = {
	user: IUser | null,
	setUser: React.Dispatch<React.SetStateAction<IUser>>
}
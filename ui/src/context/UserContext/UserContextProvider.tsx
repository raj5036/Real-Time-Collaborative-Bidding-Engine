import { PropsWithChildren, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { IUser } from "../../utils/Types";
import { SESSION_STORAGE_KEYS } from "../../utils/Constants";

const UserContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [user, setUser] = useState<IUser>(() => {
		return JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEYS.USER) || "{}")
	})

	useEffect(() => {
		sessionStorage.setItem(SESSION_STORAGE_KEYS.USER, JSON.stringify(user))
	}, [user])

	return (
		<UserContext.Provider value={{user, setUser}}>
			{children}
		</UserContext.Provider>
	)
}

export default UserContextProvider
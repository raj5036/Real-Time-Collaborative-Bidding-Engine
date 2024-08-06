import { PropsWithChildren, useState } from "react";
import { UserContext } from "./UserContext";
import { IUser } from "./Types";

const UserContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [user, setUser] = useState<IUser>({} as IUser)
	return (
		<UserContext.Provider value={{user, setUser}}>
			{children}
		</UserContext.Provider>
	)
}

export default UserContextProvider
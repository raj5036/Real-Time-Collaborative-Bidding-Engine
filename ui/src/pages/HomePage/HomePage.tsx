import { useContext } from "react"
import { UserContext } from "../../context/UserContext/UserContext"
import { IUserContext } from "../../context/UserContext/Types"

const HomePage: React.FC = () => {
	const { user } = useContext(UserContext) as IUserContext
	console.log(user)
	return (
		<div>
			Home Page
		</div>
	)
}

export default HomePage
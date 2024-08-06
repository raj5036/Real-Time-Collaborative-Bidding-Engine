import React, { useContext } from "react"
import { UserContext } from "../../context/UserContext/UserContext"
import { IUserContext } from "../../context/UserContext/Types"
import { USER_TYPES } from "../../utils/Constants"
import BidCreator from "../../components/BidCreator/BidCreator"
import BidViewer from "../../components/BidsViewer/BidsViewer"

const HomePage: React.FC = () => {
	const { user } = useContext(UserContext) as IUserContext
	console.log(user)
	return (
		<React.Fragment>
			{user?.role === USER_TYPES.BID_CREATOR 
				? <BidCreator /> 
				: <BidViewer />}
		</React.Fragment>
	)
}

export default HomePage
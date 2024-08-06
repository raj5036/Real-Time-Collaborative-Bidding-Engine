import React, { useContext } from "react"
import { UserContext } from "../../context/UserContext/UserContext"
import { IUserContext } from "../../context/UserContext/Types"
import { USER_TYPES } from "../../utils/Constants"
import BidCreator from "../../components/BidCreator/BidCreator"
import BidViewer from "../../components/BidsViewer/BidsViewer"
import Header from "../../components/Header/Header"

const HomePage: React.FC = () => {
	const { user } = useContext(UserContext) as IUserContext
	
	return (
		<React.Fragment>
			<Header />
			{user?.role === USER_TYPES.BID_CREATOR 
				? <BidCreator /> 
				: <BidViewer />}
		</React.Fragment>
	)
}

export default HomePage
import React, { useContext } from "react"
import { UserContext } from "../../context/UserContext/UserContext"
import { IUserContext } from "../../context/UserContext/Types"
import { USER_TYPES } from "../../utils/Constants"
import BidCreator from "../../components/BidCreator/BidCreator"
import BidViewer from "../../components/BidsViewer/BidsViewer"
import { HomePageContainer } from "./HomePageStyles"

const HomePage: React.FC = () => {
	const { user } = useContext(UserContext) as IUserContext
	
	return (
		<React.Fragment>
			<HomePageContainer>
				{user?.role === USER_TYPES.BID_CREATOR 
					? <BidCreator /> 
					: <BidViewer />}
			</HomePageContainer>
		</React.Fragment>
	)
}

export default HomePage
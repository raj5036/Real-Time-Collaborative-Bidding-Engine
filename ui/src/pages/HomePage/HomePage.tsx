import React, { useContext } from "react"
import { UserContext } from "../../context/UserContext/UserContext"
import { IUserContext } from "../../context/UserContext/Types"
import { USER_TYPES } from "../../utils/Constants"
import BidCreator from "../../components/BidCreator/BidCreator"
import BidViewer from "../../components/BidsViewer/BidsViewer"
import Header from "../../components/Header/Header"
import { HomePageContainer } from "./HomePageStyles"
import Sidebar from "../../components/Sidebar/Sidebar"

const HomePage: React.FC = () => {
	const { user } = useContext(UserContext) as IUserContext
	
	return (
		<React.Fragment>
			<Header />
			<Sidebar/>
			<HomePageContainer>
				{user?.role === USER_TYPES.BID_CREATOR 
					? <BidCreator /> 
					: <BidViewer />}
			</HomePageContainer>
		</React.Fragment>
	)
}

export default HomePage
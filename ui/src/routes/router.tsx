import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import HomePage from "../pages/HomePage/HomePage";
import SignupPage from "../pages/SignupPage/SignupPage";
import AppRoutes from "./routes";
import Layout from "../components/Layout/Layout";
import CreateBidsPage from "../pages/CreateBidsPage/CreateBidsPage";
import BidsLeaderBoardPage from "../pages/BidsLeaderBoardPage/BidsLeaderBoard";
import BiddingPage from "../pages/BiddingPage/BiddingPage";

const router = createBrowserRouter([
	{
		path: AppRoutes.LOGIN,
		element: <LoginPage />,
	},
	{
		path: AppRoutes.SIGNUP,
		element: <SignupPage />
	},
	{
		path: AppRoutes.MAIN,
		element: <Layout />,
		children: [
			{path: AppRoutes.DASHBOARD, element: <HomePage />},		
			{path: AppRoutes.CREATE_BID, element: <CreateBidsPage />},
			{path: AppRoutes.BIDS_LEADERBOARD, element: <BidsLeaderBoardPage />},
			{path: AppRoutes.BIDDING_PAGE, element: <BiddingPage />},
		]
	}
]);

export default router
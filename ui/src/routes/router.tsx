import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import HomePage from "../pages/HomePage/HomePage";
import SignupPage from "../pages/SignupPage/SignupPage";
import AppRoutes from "./routes";
import Layout from "../components/Layout/Layout";

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
		]
	}
]);

export default router
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import HomePage from "../pages/HomePage/HomePage";
import SignupPage from "../pages/SignupPage/SignupPage";
import AppRoutes from "./routes";

const router = createBrowserRouter([
	{
		path: AppRoutes.DASHBOARD,
		element: <HomePage />,
	},
	{
		path: AppRoutes.LOGIN,
		element: <LoginPage />,
	},
	{
		path: AppRoutes.SIGNUP,
		element: <SignupPage />
	},
	{
		path: "*",
		element: <LoginPage />
	}
]);

export default router
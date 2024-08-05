import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import HomePage from "../pages/HomePage/HomePage";
import SignupPage from "../pages/SignupPage/SignupPage";

const router = createBrowserRouter([
	{
		path: "/home",
		element: <HomePage />,
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/signup",
		element: <SignupPage />
	}
]);

export default router
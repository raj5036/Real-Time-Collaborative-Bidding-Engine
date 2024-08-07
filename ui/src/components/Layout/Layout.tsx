import React from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
	return (
		<React.Fragment>
			<Header />
			<Sidebar />
			<main className="main-content">
				<Outlet />
			</main>
		</React.Fragment>
	)
}

export default Layout
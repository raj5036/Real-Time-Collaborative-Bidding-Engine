import React from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { MainContainer } from "./LayoutStyles";

const Layout: React.FC = () => {
	return (
		<React.Fragment>
			<Header />
			<Sidebar />
			<MainContainer>
				<Outlet />
			</MainContainer>
		</React.Fragment>
	)
}

export default Layout
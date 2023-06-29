import { Outlet } from "react-router-dom";
import Nav from "../Navigation/default/Nav";
import Forecast from "../Forecast/Forecast";
import MobileNav from "../Navigation/mobile/MobileNav";

export default function Layout() {
	return (
		<>
			<Nav />
			<Outlet />
			<Forecast />
			<MobileNav />
		</>
	);
}

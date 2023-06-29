import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import Map from "./pages/MapSearch/Map";
import Saved from "./pages/Saved/Saved";
import { createContext, useEffect, useState } from "react";
import Layout from "./views/Layout/Layout";
import ForecastMobile from "./pages/Forecast/ForecastMobile";
import {
	Props,
	Coords,
	Result,
	Context,
} from "./components/Characteristics/Home";
import "mapbox-gl/dist/mapbox-gl.css";
import Home from "./pages/Home/Home";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path='/' element={<Layout />}>
				<Route index element={<Home />} />
				<Route path='/map' element={<Map />} />
				<Route path='/saved' element={<Saved />} />
				<Route path='/forecast' element={<ForecastMobile />} />
			</Route>
		</>
	)
);

export const AppContext = createContext<Context | null>(null);
function App() {
	const [data, setData] = useState<Props | null>(null);
	const [tempIn, setTempIn] = useState<string>("C");
	const [coords, setCoords] = useState<Coords | null>(null);
	const [saved, setSaved] = useState<Result | []>([]);

	useEffect(() => {
		localStorage.setItem("saved", JSON.stringify(saved));
	}, [saved]);

	return (
		<>
			<div className='items-top flex h-full w-full flex-row justify-center'>
				<AppContext.Provider
					value={{
						data: [data, setData],
						tempIn: [tempIn, setTempIn],
						coords: [coords, setCoords],
						saved: [saved, setSaved],
					}}>
					<RouterProvider router={router} />
				</AppContext.Provider>
			</div>
		</>
	);
}

export default App;

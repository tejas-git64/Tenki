/* eslint-disable no-mixed-spaces-and-tabs */
import { useContext, useEffect, useState, useRef } from "react";
import search from "../../assets/images/icons8-search-104.png";
import { AppContext } from "../../App";
import Location from "../../components/Location/Location";
import { Query, Coords } from "../../components/Characteristics/Home";
import mapboxgl, { Map } from "mapbox-gl";

export default function MapSearch() {
	const mapContext = useContext(AppContext);
	const [lng, setLng] = useState(0);
	const [lat, setLat] = useState(0);
	const latitude = mapContext?.data[0]?.location.lat;
	const longitude = mapContext?.data[0]?.location.lon;
	const [query, setQuery] = useState<string>("");
	const [results, setResults] = useState<Query | null>(null);

	//Mapbox Map
	const mapContainer = useRef<HTMLDivElement | null>(null);
	const map = useRef<Map | null>(null);
	const marker = new mapboxgl.Marker({
		color: "red",
		rotationAlignment: "map",
		anchor: "center",
	});

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		setQuery(e.target.value);
	}

	function getCoordinates(pos: Coords) {
		setLng(pos.coords.longitude);
		setLat(pos.coords.latitude);
	}

	async function searchWeather(params: string) {
		const data = await fetch(
			`https://api.weatherapi.com/v1/search.json?key=${
				import.meta.env.VITE_WEATHER_API_KEY
			}&q=${params}`
		);
		const json = await data.json();
		setResults(json);
	}

	function error(err: { code: number; message: string }) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
	}

	function getMap() {
		if (map.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			accessToken: import.meta.env.VITE_MAPBOX_API_KEY,
			container: "mapContainer",
			style: "mapbox://styles/mapbox/streets-v12",
			center: [longitude || lat, latitude || lng],
			zoom: 12,
			interactive: true,
			dragRotate: true,
		});
		const navigation = new mapboxgl.NavigationControl({
			visualizePitch: true,
			showZoom: true,
		});
		map.current.addControl(navigation, "bottom-right");
		marker.setLngLat([longitude || lng, latitude || lat]);
		marker.addTo(map.current);
		map.current?.flyTo({
			center: [longitude || lng, latitude || lat],
			essential: true,
			duration: 350,
		});
	}

	function refreshCoords() {
		if (!map.current) return; // wait for map to initialize
		map.current.on("move", () => {
			setLat(Number(map.current?.getCenter().lat.toFixed(4)));
			setLng(Number(map.current?.getCenter().lng.toFixed(4)));
			map.current ? map.current.getZoom() : "";
		});
	}

	function refreshLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(getCoordinates, error, {
				enableHighAccuracy: true,
			});
		} else {
			return;
		}
	}

	useEffect(() => {
		query && searchWeather(query);
	}, [query]);

	useEffect(() => {
		refreshCoords();
		refreshLocation();
		getMap();
	}, [latitude, longitude, lat, lng, navigator.geolocation]);

	//Drag event listener

	return (
		<>
			<div className='relative h-[calc(100vh-0vh)] w-full overflow-hidden bg-black xl:w-[calc(100%-40%)]'>
				<div
					className={`rounded-x absolute left-5 top-5 z-10 flex h-12 w-[calc(100%-8%)] items-center rounded-md bg-white sm:w-[calc(100%-6%)] md:h-16 md:w-[calc(100%-5.5%)] xl:w-[calc(100%-5%)] 2xl:w-[calc(100%-3.5%)]`}>
					<input
						type='search'
						onChange={(e) => handleChange(e)}
						value={query}
						placeholder='Search using City name, (Latitude, Longitude), IP address'
						className={`r-2 h-12 w-[calc(100%-10%)] rounded-l-md border-gray-300 bg-cover bg-no-repeat p-4 text-xl font-semibold text-gray-600 outline-none placeholder:text-base placeholder:font-semibold md:mr-5 md:h-14 md:w-[calc(100%-5%)] md:px-6 md:placeholder:text-lg`}
					/>
					<img
						src={search}
						alt='search'
						className='ml-2 h-5 w-5 invert-[0.5] md:-ml-4 md:h-8 md:w-8'
					/>
				</div>
				<ul className='absolute left-5 z-10 mt-24 h-auto w-[calc(100%-8%)] rounded-xl bg-white sm:w-[calc(100%-6%)] md:w-[calc(100%-5.5%)] xl:w-[calc(100%-5%)] 2xl:w-[calc(100%-3.5%)]'>
					{results?.map(
						(result: {
							id: number;
							name: string;
							country: string;
							lat: number;
							lon: number;
						}) => (
							<Location
								key={result.id}
								name={result.name}
								country={result.country}
								lat={result.lat}
								lon={result.lon}
								add={
									mapContext?.saved[0].some((p) => p.name === result.name)
										? true
										: false
								}
							/>
						)
					)}
				</ul>
				<div
					ref={mapContainer}
					id='mapContainer'
					className='h-[calc(100%-5%)] md:h-full'></div>
				<div
					style={{
						backgroundColor: "#00000050",
					}}
					className='w-84 absolute bottom-32 left-[13vw] whitespace-nowrap rounded-2xl p-4 text-sm font-semibold text-white sm:left-[28vw] md:left-[] md:text-lg lg:left-[35vw] xl:left-[18vw]'>
					Longitude: {longitude} | Latitude: {latitude}
				</div>
			</div>
		</>
	);
}

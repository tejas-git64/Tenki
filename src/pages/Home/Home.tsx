/* eslint-disable no-mixed-spaces-and-tabs */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import position from "../../assets/images/icons8-gps-48.png";
import Characteristics from "../../components/Characteristics/Characteristics";
import refresh from "../../assets/images/icons8-refresh-32.png";
import locate from "../../assets/images/icons8-location-48.png";
import cloud from "../../assets/images/icons8-rain-cloud-48.png";
import pressure from "../../assets/images/icons8-pressure-26.png";
import wind from "../../assets/images/icons8-wind-50.png";
import Hourly from "../../components/Hourly/Hourly";
import { Coords, HourlyProps } from "../../components/Characteristics/Home";
import { AppContext } from "../../App";
import { images } from "../../data/images";
import { motion } from "framer-motion";

export default function Home() {
	const condition = images;
	const date = new Date();
	const [effect, setEffect] = useState(false);
	const homeContext = useContext(AppContext);
	const now = homeContext?.data?.[0]?.forecast?.forecastday[0].hour.findIndex(
		(hr) => Number(hr.time.substring(11, 13)) === date.getHours()
	);
	const hrs: HourlyProps | undefined =
		homeContext?.data[0]?.forecast?.forecastday[0]?.hour;
	const weatherLike = hrs ? hrs[now ? now : 0].condition.text : "";
	const day = homeContext?.data[0]?.forecast?.forecastday[0].day;
	const latitude = homeContext?.data[0]?.location.lat;
	const longitude = homeContext?.data[0]?.location.lon;
	const mediaQuery = window.matchMedia("(max-width: 768px)");
	const [image, setImage] = useState({
		url: "",
	});

	const variants = {
		open: {
			transition: { staggerChildren: 0.07, delayChildren: 0.2 },
		},
		closed: {
			transition: { staggerChildren: 0.05, staggerDirection: -1 },
		},
	};

	// Data fetching function
	async function getData(pos: Coords) {
		homeContext?.coords[1](pos);
		const weatherData =
			latitude && longitude
				? await fetch(
						`https://api.weatherapi.com/v1/forecast.json?key=753f7a944f9e4ab999d165721231705&q=${latitude},${longitude}&days=7&aqi=yes&alerts=yes`
				  )
				: await fetch(`https://api.weatherapi.com/v1/forecast.json?key=753f7a944f9e4ab999d165721231705&q=${pos.coords.latitude},${pos.coords.longitude}&days=7&aqi=yes&alerts=yes
		`);
		const json = await weatherData.json();
		homeContext?.data[1](json);
	}

	function error(err: { code: number; message: string }) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
	}

	function getWeatherImage(feel: string | undefined) {
		switch (true) {
			case feel === "Sunny":
				mediaQuery.matches
					? setImage((prev) => ({
							...prev,
							url: condition[0].portrait,
					  }))
					: setImage((prev) => ({
							...prev,
							url: condition[0].landscape,
					  }));
				break;
			case feel === "Partly Cloudy" || feel === "Cloudy" || feel === "Overcast":
				mediaQuery.matches
					? setImage((prev) => ({
							...prev,
							url: condition[2].portrait,
					  }))
					: setImage((prev) => ({
							...prev,
							url: condition[2].landscape,
					  }));
				break;
			case feel === "Mist" || feel === "Fog" || feel === "Freezing Fog":
				mediaQuery.matches
					? setImage((prev) => ({
							...prev,
							url: condition[3].portrait,
					  }))
					: setImage((prev) => ({
							...prev,
							url: condition[3].landscape,
					  }));
				break;
			case feel === "Moderate or heavy rain shower" ||
				feel === "Torrential rain shower" ||
				feel === "Freezing drizzle" ||
				feel === "Heavy freezing drizzle":
				mediaQuery.matches
					? setImage((prev) => ({
							...prev,
							url: condition[6].portrait,
					  }))
					: setImage((prev) => ({
							...prev,
							url: condition[6].landscape,
					  }));
				break;
			case feel === "Patchy rain possible" ||
				feel === "Patchy light rain" ||
				feel === "Moderate rain at times" ||
				feel === "Moderate rain" ||
				feel === "Light rain shower" ||
				feel === "Patchy light rain with thunder" ||
				feel === "Patchy light drizzle" ||
				feel === "Light drizzle":
				mediaQuery.matches
					? setImage((prev) => ({
							...prev,
							url: condition[1].portrait,
					  }))
					: setImage((prev) => ({
							...prev,
							url: condition[1].landscape,
					  }));
				break;
			case feel === "Patchy snow possible" ||
				feel === "Blowing snow" ||
				feel === "Blizzard" ||
				feel === "Patchy light snow" ||
				feel === "Light snow" ||
				feel === "Moderate snow" ||
				feel === "Patchy heavy snow" ||
				feel === "Heavy snow" ||
				feel === "Light snow showers" ||
				feel === "Patchy light snow with thunder":
				mediaQuery.matches
					? setImage((prev) => ({
							...prev,
							url: condition[4].portrait,
					  }))
					: setImage((prev) => ({
							...prev,
							url: condition[4].landscape,
					  }));
				break;
			case feel === "Light sleet" ||
				feel === "Ice pellets" ||
				feel === "Light sleet showers" ||
				feel === "Light showers of ice pellets":
				mediaQuery.matches
					? setImage((prev) => ({
							...prev,
							url: condition[5].portrait,
					  }))
					: setImage((prev) => ({
							...prev,
							url: condition[5].landscape,
					  }));
				break;
			default:
				mediaQuery.matches
					? setImage((prev) => ({
							...prev,
							url: condition[0].portrait,
					  }))
					: setImage((prev) => ({
							...prev,
							url: condition[0].landscape,
					  }));
		}
	}

	// Refresher function to animate button
	function refreshLocation() {
		setEffect((prev) => !prev);
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(getData, error);
		} else {
			return;
		}
		() => setEffect(false);
	}

	// function to resetlocation to geolocation
	// in case other locaion weather is set in state
	function resetLocation() {
		homeContext?.data[1]((prev) =>
			prev
				? {
						...prev,
						location: {
							lon: 0,
							lat: 0,
							name: "",
							region: "",
							country: "",
							tz_id: "",
							localtime_epoch: 0,
							localtime: "",
						},
				  }
				: null
		);
	}

	useEffect(() => {
		getWeatherImage(weatherLike);
	}, [weatherLike]);

	useEffect(() => {
		refreshLocation();
	}, [navigator.geolocation, latitude, longitude]);

	return (
		<>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1 }}
				style={{
					backgroundImage: `linear-gradient(180deg, #0003, #fff0),url(${image.url})`,
				}}
				className={`max-h-auto h-[calc(100vh-0vh)] w-full overflow-y-scroll bg-white bg-cover bg-center bg-no-repeat py-4 md:p-5 xl:w-[calc(100%-40%)]`}>
				<nav className='flex h-auto w-full items-center justify-between px-4'>
					<Link to='/map' className='flex h-auto w-auto items-center'>
						<img src={locate} alt='location' className='mr-2 w-8' />
						<p className='mr-2 text-xl text-white'>
							{homeContext?.data[0]?.location.name}
						</p>
					</Link>
					<div className='flex items-center justify-center'>
						<h2 className='mr-4 hidden text-xl font-medium text-white md:block'>
							Today{" "}
							{`${date.getHours()}:${date.getMinutes()} ${
								date.getHours() > 12 ? "PM" : "AM"
							}`}
						</h2>
						<motion.div className='flex w-32 items-center justify-end'>
							<motion.button
								whileTap={{
									scale: 0.7,
								}}
								onClick={resetLocation}
								style={{
									outline: "none",
									border: "none",
								}}
								className='bg-transparent p-0 font-semibold outline-none'>
								<motion.img
									src={position}
									alt='search'
									className='w-8 md:w-10'
								/>
							</motion.button>
							<button
								onClick={refreshLocation}
								style={{
									outline: "none",
								}}
								className={`ml-2 rounded-full bg-transparent p-0`}>
								<img
									src={refresh}
									alt='refresh'
									className={`w-8 md:w-10 ${
										effect ? "animate-refresh" : "animate-none"
									}`}
								/>
							</button>
						</motion.div>
					</div>
				</nav>
				<div className='mb-14 flex h-auto w-full flex-col items-center justify-start rounded-3xl md:mb-0 md:p-6'>
					<div className='flex h-auto w-full flex-col items-center justify-evenly p-4 md:flex-row'>
						<motion.div className='h-auto md:w-80'>
							<motion.div
								initial={{
									scale: 0,
									opacity: 0.5,
								}}
								animate={{
									scale: 1,
									opacity: 1,
								}}
								drag
								dragSnapToOrigin={true}
								dragConstraints={{
									top: 0,
									left: 0,
									right: 0,
									bottom: 0,
								}}
								className='flex h-64 w-96 flex-col items-center justify-center md:my-2 md:h-80 md:w-80'>
								<h1 className='text-8xl font-semibold text-white md:mb-6 md:text-[130px]'>
									{homeContext?.tempIn[0] === "C"
										? `${
												homeContext?.data[0]?.current
													? homeContext?.data[0].current.temp_c
													: "~.~"
										  }°C`
										: `${
												homeContext?.data[0]?.current
													? homeContext?.data[0].current.temp_f
													: "~.~"
										  }°F`}
								</h1>
								<p className='my-6 px-20 text-xl font-bold text-white md:mb-0 md:px-10 md:text-2xl'>
									{weatherLike}
								</p>
							</motion.div>
						</motion.div>
						<motion.div
							initial={{
								scale: 0,
								opacity: 0,
							}}
							animate={{
								scale: 1,
								opacity: 1,
							}}
							transition={{
								duration: 1,
							}}
							style={{
								backgroundColor: "#ffffff44",
							}}
							className='w-84 flex h-auto flex-col items-start justify-evenly rounded-2xl p-6 md:w-[calc(100%-55%)]'>
							<h2 className='text-md mb-4 text-left font-semibold text-white md:mb-2 md:text-xl'>
								Temperature
							</h2>
							<div className='flex h-52 w-full flex-col sm:h-64 sm:w-full'>
								<ul className='mx-auto flex h-auto w-auto items-center justify-center'>
									<li className='mt-4 flex h-52 w-full flex-col items-center justify-center md:-mt-4 md:h-72'>
										<input
											type='range'
											min='0'
											max='50'
											title='morning'
											onChange={(e) => e.preventDefault()}
											value={Math.round(hrs ? hrs[6].temp_c : 0) || 0}
											className='h-[4px] w-[calc(100%+60%)] -rotate-90 bg-white md:w-[calc(100%+50%)]'
										/>
										<p className='md:text-md -mb-6 mt-24 text-sm font-bold text-white md:-mb-24 md:mt-28'>
											Morning
											<br />
											{homeContext?.tempIn[0] === "C"
												? `${hrs ? hrs[6].temp_c : 0}°C`
												: `${hrs ? hrs[6].temp_f : 0}°F`}
										</p>
									</li>
									<li className='mt-4 flex h-52 w-full flex-col items-center justify-center md:-mt-4 md:h-72'>
										<input
											type='range'
											min='0'
											max='50'
											title='afternoon'
											onChange={(e) => e.preventDefault()}
											value={Math.round(hrs ? hrs[13].temp_c : 0) || 0}
											className='h-[4px] w-[calc(100%+60%)] -rotate-90 border-none bg-white  md:w-[calc(100%+50%)]'
										/>
										<p className='md:text-md -mb-6 mt-24 text-sm font-bold text-white md:-mb-24 md:mt-28'>
											{" "}
											Afternoon
											<br />
											{homeContext?.tempIn[0] === "C"
												? `${hrs ? hrs[13].temp_c : 0}°C`
												: `${hrs ? hrs[13].temp_f : 0}°F`}
										</p>
									</li>
									<li className='mt-4 flex h-52 w-full flex-col items-center justify-center md:-mt-4 md:h-72'>
										<input
											type='range'
											min='0'
											max='50'
											title='evening'
											onChange={(e) => e.preventDefault()}
											value={Math.round(hrs ? hrs[17].temp_c : 0) || 0}
											className='h-[4px] w-[calc(100%+60%)] -rotate-90 border-none md:w-[calc(100%+50%)]'
										/>
										<p className='md:text-md -mb-6 mt-24 text-sm font-bold text-white md:-mb-24 md:mt-28'>
											Evening
											<br />
											{homeContext?.tempIn[0] === "C"
												? `${hrs ? hrs[17].temp_c : 0}°C`
												: `${hrs ? hrs[17].temp_f : 0}°F`}
										</p>
									</li>
									<li className='mt-4 flex h-52 w-full flex-col items-center justify-center md:-mt-4 md:h-72'>
										<input
											type='range'
											min='0'
											max='50'
											title='night'
											onChange={(e) => e.preventDefault()}
											value={Math.round(hrs ? hrs[21].temp_c : 0) || 0}
											className='h-[4px] w-[calc(100%+60%)] -rotate-90 border-none md:w-[calc(100%+50%)]'
										/>
										<p className='md:text-md -mb-6 mt-24 text-sm font-bold text-white md:-mb-24 md:mt-28'>
											Night
											<br />
											{homeContext?.tempIn[0] === "C"
												? `${hrs ? hrs[21].temp_c : 0}°C`
												: `${hrs ? hrs[21].temp_f : 0}°F`}
										</p>
									</li>
								</ul>
							</div>
						</motion.div>
					</div>
					<motion.ul className='mb-12 mt-6 flex h-20 w-full list-none items-center justify-between rounded-full px-10 md:mb-14 md:mt-12 md:px-20'>
						<motion.li
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 1.5 }}
							className='flex flex-col items-center justify-center xl:flex-row'>
							<img
								src={cloud}
								className='w-6 md:w-8 xl:mr-4 xl:w-10'
								alt='precipitation'
							/>
							<p className='text-2xl font-bold text-white md:text-4xl'>
								{`${Math.round(day?.totalprecip_in ? day.totalprecip_in : 0)}%`}
							</p>
						</motion.li>
						<motion.li
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 1.5 }}
							className='flex flex-col items-center justify-center xl:flex-row'>
							<img
								src={pressure}
								className='w-6 md:w-8 xl:mr-4 xl:w-10'
								alt='pressure'
							/>
							<p className='text-2xl font-bold text-white md:text-4xl'>
								{homeContext?.data[0]?.current?.pressure_mb}
							</p>
						</motion.li>
						<motion.li
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 1.5 }}
							className='flex flex-col items-center justify-center xl:flex-row'>
							<img
								src={wind}
								className='w-6 md:w-8 xl:mr-4 xl:w-10'
								alt='wind'
							/>
							<p className='text-2xl font-bold text-white md:text-4xl'>
								{homeContext?.data[0]?.current?.wind_mph}
							</p>
						</motion.li>
					</motion.ul>
					<motion.div
						variants={variants}
						style={{
							gridTemplateColumns: "repeat(auto-fit, minmax(370px, 1fr) )",
						}}
						className='m-auto mb-10 grid h-auto gap-5 md:mb-4 md:w-full'>
						<Characteristics
							wind_degree={homeContext?.data[0]?.current?.wind_degree}
							wind_kph={homeContext?.data[0]?.current?.wind_kph}
							wind_mph={homeContext?.data[0]?.current?.wind_mph}
							wind_dir={homeContext?.data[0]?.current?.wind_dir}
							pressure_in={undefined}
							pressure_mb={undefined}
							gb_defra_index={undefined}
							uv={undefined}
							humidity={undefined}
						/>
						<Characteristics
							pressure_in={homeContext?.data[0]?.current?.pressure_in}
							pressure_mb={homeContext?.data[0]?.current?.pressure_mb}
							wind_degree={undefined}
							wind_dir={undefined}
							wind_kph={undefined}
							wind_mph={undefined}
							gb_defra_index={undefined}
							uv={undefined}
							humidity={undefined}
						/>
						<Characteristics
							gb_defra_index={
								homeContext?.data[0]?.current?.air_quality["gb-defra-index"]
							}
							wind_degree={undefined}
							wind_dir={undefined}
							wind_kph={undefined}
							wind_mph={undefined}
							pressure_in={undefined}
							pressure_mb={undefined}
							uv={undefined}
							humidity={undefined}
						/>
						<Characteristics
							humidity={homeContext?.data[0]?.current?.humidity}
							wind_degree={undefined}
							wind_dir={undefined}
							wind_kph={undefined}
							wind_mph={undefined}
							pressure_in={undefined}
							pressure_mb={undefined}
							gb_defra_index={undefined}
							uv={undefined}
						/>
					</motion.div>
					<motion.div className='flex h-80 w-full flex-col bg-white md:hidden'>
						<div className='flex h-16 w-full items-center justify-between px-5'>
							<h2 className='text-xl font-bold'>Today</h2>
							<Link
								to='/forecast'
								className='text-md mt-1 font-bold text-amber-700 underline'>
								Next 7 days
							</Link>
						</div>
						<div className='m-0 h-44 w-full'>
							<ul
								id='hrs'
								className='mt-4 flex h-full w-full list-none overflow-x-scroll py-2'>
								{hrs?.map((hr, index) => (
									<Hourly
										key={index}
										tempIn={hr.tempIn}
										time={hr.time}
										temp_c={hr.temp_c}
										temp_f={0}
										condition={hr.condition}
										time_epoch={0}
										is_day={0}
										wind_kph={0}
										wind_mph={0}
										wind_degree={0}
										wind_dir={""}
										precip_mm={0}
										precip_in={0}
										humidity={0}
										cloud={0}
										feelslike_c={0}
										feelslike_f={0}
										windchill_c={0}
										windchill_f={0}
										heatindex_c={0}
										heatindex_f={0}
										dewpoint_c={0}
										dewpoint_f={0}
										will_it_rain={0}
										chance_of_rain={0}
										will_it_snow={0}
										chance_of_snow={0}
										vis_km={0}
										vis_miles={0}
										gust_mph={0}
										gust_kph={0}
										uv={0}
										air_quality={{
											co: 0,
											no2: 0,
											o3: 0,
											so2: 0,
											pm2_5: 0,
											pm10: 0,
										}}
									/>
								))}
							</ul>
						</div>
					</motion.div>
				</div>
			</motion.div>
		</>
	);
}

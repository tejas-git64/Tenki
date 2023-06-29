import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { Props } from "../../components/Characteristics/Home";
import Daily from "../../components/Daily/Daily";
import { motion } from "framer-motion";

export default function ForecastMobile() {
	const forecastContext = useContext(AppContext);
	const date = new Date();
	const [forecast, setForecast] = useState<Props | null>(null);

	const variants = {
		open: {
			transition: { staggerChildren: 0.07, delayChildren: 0.2 },
		},
		closed: {
			transition: { staggerChildren: 0.05, staggerDirection: -1 },
		},
	};

	function getHour(hr: string): number {
		const hour = Number(hr.substring(11, 13));
		return hour;
	}

	//Function to get Day name
	function getDayName(dateStr: string | undefined, locale: string) {
		const date = new Date(dateStr ? dateStr : "");
		return date.toLocaleDateString(locale, { weekday: "long" });
	}

	async function getForecastData() {
		const weatherData =
			await fetch(`https://api.weatherapi.com/v1/forecast.json?key=753f7a944f9e4ab999d165721231705&q=Bangalore&days=7&aqi=yes&alerts=yes
		`);
		const json = await weatherData.json();
		setForecast(json);
	}

	useEffect(() => {
		getForecastData();
	}, []);

	return (
		<>
			<motion.div
				className={`h-[calc(100vh-0vh)] w-full bg-white px-4 xl:block`}>
				<h2 className='my-2 mb-0 p-3 text-left text-2xl font-bold'>Forecast</h2>
				<motion.div className='flex h-auto w-full flex-col items-start justify-center px-4'>
					<p className='mb-4 w-full px-4 text-right text-xl font-bold'>Today</p>
					<motion.ul
						id='mobile'
						variants={variants}
						className='mb-2 flex h-full w-full overflow-x-scroll p-2 px-0 md:mt-4'>
						{forecast?.forecast?.forecastday[0].hour.map((hr, index) => (
							<motion.div
								whileTap={{ scale: 0.95 }}
								initial={{
									opacity: 0,
									scale: 0,
								}}
								whileInView={{
									opacity: 1,
									scale: 1,
									boxShadow: "initial",
								}}
								transition={{
									duration: 0.5,
								}}
								key={index}
								className={`mr-4 flex w-24 ${
									date.getHours() === getHour(hr.time)
										? "bg-gray-700"
										: "bg-transparent"
								} flex-shrink-0 flex-col items-center justify-evenly rounded-2xl py-4`}>
								<p
									className={`text-md ${
										date.getHours() === getHour(hr.time)
											? "text-white"
											: "text-gray-500"
									} whitespace-nowrap font-semibold`}>
									{`${
										date.getHours() === getHour(hr.time)
											? "NOW"
											: hr.time.substring(11, 13)
									}${
										date.getHours() === getHour(hr.time)
											? ""
											: getHour(hr.time) < 12
											? "AM"
											: "PM"
									}`}
								</p>
								<img
									src={hr.condition.icon}
									alt='weather-icon'
									className='my-2'
								/>
								<p
									className={`${
										date.getHours() === getHour(hr.time)
											? "text-white"
											: "text-black"
									} text-lg font-bold`}>
									{forecastContext?.tempIn[0] === "C"
										? `${hr.temp_c}°C`
										: `${hr.temp_f}°F`}
								</p>
							</motion.div>
						))}
					</motion.ul>
					<p
						className={`my-4 w-full px-4 text-right text-xl font-bold md:my-6`}>
						Next 7 days
					</p>
					<motion.ul
						id='days'
						className='mx-auto flex h-[calc(100vh-55vh)] w-full flex-col overflow-y-scroll scroll-smooth py-2'>
						{forecast?.forecast?.forecastday.map((obj) => (
							<Daily
								dayName={getDayName(obj.date, "en-US")}
								date={obj.date}
								key={obj.date_epoch}
								tempc={obj.day.avgtemp_c}
								tempf={obj.day.avgtemp_f}
								icon={obj.day.condition.icon}
							/>
						))}
					</motion.ul>
				</motion.div>
			</motion.div>
		</>
	);
}

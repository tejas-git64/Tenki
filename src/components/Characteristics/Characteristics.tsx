import Wind from "../Wind/Wind";
import Pressure from "../Pressure/Pressure";
import AirQuality from "../AQI/AQI";
import Humidity from "../Humidity/Humidity";
import { Characteristic } from "./Home";
import { motion } from "framer-motion";
export default function Characteristics({
	wind_kph,
	wind_mph,
	pressure_in,
	pressure_mb,
	gb_defra_index,
	uv,
	humidity,
}: Characteristic) {
	return (
		<>
			<motion.div
				whileTap={{ scale: 0.95 }}
				initial={{
					opacity: 0,
					scale: 0,
				}}
				whileInView={{
					opacity: 0.95,
					scale: 1,
				}}
				transition={{
					duration: 0.5,
				}}
				className='m-auto flex h-32 w-80 items-center justify-between rounded-xl bg-white p-3 px-4 pr-0 md:h-48 md:w-full md:p-6 md:pr-4 '>
				<div className='flex h-full w-72 flex-col items-start justify-start'>
					<b className='text-lg text-black md:text-2xl'>
						{(wind_kph && "Wind") ||
							(pressure_in && "Pressure") ||
							(gb_defra_index && "AQI Index") ||
							(humidity && "Humidity") ||
							(uv && "UV Index")}
					</b>
					<p className='font-semibold text-gray-600 opacity-80 md:my-2 md:text-lg'>
						Today's{" "}
						{(wind_mph && "wind speed") ||
							(pressure_in && "Pressure") ||
							(gb_defra_index && "AQI") ||
							(humidity && "Humidity") ||
							(uv && "UV Index")}
					</p>
					<h1 className='m-2 ml-0 text-4xl font-semibold text-teal-700 opacity-80 md:mt-4 md:text-5xl'>
						{(wind_mph && `${wind_mph.toFixed(2)}Mph`) ||
							(pressure_mb && `${pressure_mb}Mb`) ||
							gb_defra_index ||
							(humidity && `${humidity}`)}
					</h1>
				</div>
				{wind_mph && <Wind windspeed={wind_mph} />}
				{pressure_in && <Pressure />}
				{gb_defra_index && <AirQuality index={gb_defra_index} />}
				{humidity && <Humidity />}
			</motion.div>
		</>
	);
}

import { motion } from "framer-motion";
import { WindDetails } from "./WindDetails";
import lightbreeze from "../../assets/images/wind/icons8-wind-low.png";
import heavybreeze from "../../assets/images/wind/icons8-wind-mid.png";
import stormybreeze from "../../assets/images/wind/icons8-wind-high.png";

export default function Wind({ windspeed }: WindDetails) {
	function getWindImage(speed: number) {
		switch (true) {
			case speed <= 4:
				return lightbreeze;
				break;
			case speed >= 5 && speed <= 9:
				return heavybreeze;
				break;
			case speed >= 10 && speed <= 12:
				return stormybreeze;
				break;
		}
	}

	function getWindIype(speed: number) {
		switch (true) {
			case speed <= 4:
				return "Light Breeze";
				break;
			case speed >= 5 && speed <= 9:
				return "Heavy Breeze";
				break;
			case speed >= 10 && speed <= 12:
				return "Stormy Breeze";
				break;
		}
	}

	return (
		<>
			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				whileInView={{ opacity: 1, scale: 1 }}
				transition={{ duration: 1 }}
				className='flex h-32 w-52 flex-col items-center justify-center p-2 md:h-40'>
				<img
					src={getWindImage(windspeed)}
					alt='condition'
					className='mb-2 h-12 w-12 md:mb-4 md:h-20 md:w-20'
				/>
				<p className={`text-md whitespace-nowrap font-bold md:text-lg`}>
					{getWindIype(windspeed)}
				</p>
			</motion.div>
		</>
	);
}

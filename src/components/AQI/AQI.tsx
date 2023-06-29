import { motion } from "framer-motion";
import { AQIndex } from "../Characteristics/Home";
import good from "../../assets/images/aqi/icons8-leaf-good.png";
import moderate from "../../assets/images/aqi/icons8-leaf-60.png";
import unhealthy from "../../assets/images/aqi/icons8-escape-mask-48.png";
import hazardous from "../../assets/images/aqi/icons8-skull-64.png";

export default function AirQuality({ index }: AQIndex) {
	function getCondition(aqi: number) {
		switch (true) {
			case aqi === 1:
				return "Good";
				break;
			case aqi === 2:
				return "Moderate";
				break;
			case aqi === 3 || 4:
				return "Unhealthy";
				break;
			case aqi === 5:
				return "Very Unhealthy";
				break;
			case aqi === 6:
				return "Hazardous";
				break;
			default:
				return null;
		}
	}

	function getImage(ind: number) {
		switch (true) {
			case ind === 1:
				return good;
				break;
			case ind === 2:
				return moderate;
				break;
			case ind === 3 || 4 || 5:
				return unhealthy;
				break;
			case ind === 6:
				return hazardous;
				break;
		}
	}

	function getTextColor(ind: number) {
		switch (true) {
			case ind === 1:
				return "text-green-700";
				break;
			case ind === 2:
				return "text-amber-400";
				break;
			case ind === 3 || 4 || 5:
				return "text-amber-700";
				break;
			case ind === 6:
				return "text-red-700";
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
					src={getImage(index)}
					alt='condition'
					className='mb-2 h-14 w-14 md:h-20 md:w-20'
				/>
				<p
					className={`text-xl ${getTextColor(
						index
					)} whitespace-nowrap font-bold md:text-2xl`}>
					{getCondition(index)}
				</p>
			</motion.div>
		</>
	);
}

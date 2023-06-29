import { motion } from "framer-motion";
import { HourlyProps } from "../Characteristics/Home";

export default function Hourly({ time, condition, temp_c }: HourlyProps[0]) {
	return (
		<>
			<motion.li
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
					duration: 0.8,
				}}
				className='ml-4 flex w-24 flex-shrink-0 flex-col items-center justify-evenly rounded-2xl py-4'>
				<p className='text-md whitespace-nowrap font-semibold text-gray-400'>
					{`${time.split(" ").splice(1, 1)}${
						Number(time.split(":").splice(1, 1)) < 12 ? "AM" : "PM"
					}` ||
						`${time?.split(" ").splice(1, 1)}${
							Number(time.split(":").splice(1, 1)) < 12 ? "AM" : "PM"
						}`}
				</p>
				<img src={condition.icon} alt='weather-icon' className='my-2' />
				<p className='text-lg font-bold'>{`${temp_c}°C`}</p>
			</motion.li>
		</>
	);
}

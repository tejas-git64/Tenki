import { AppContext } from "../../App";
import { useContext } from "react";
import { DailyDaily } from "../Characteristics/Home";
import { motion } from "framer-motion";

export default function Daily({
	tempc,
	tempf,
	icon,
	date,
	dayName,
}: DailyDaily) {
	const dailyContext = useContext(AppContext);
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	return (
		<>
			<motion.li
				whileTap={{ scale: 0.95 }}
				initial={{
					opacity: 0,
				}}
				whileInView={{
					opacity: 1,
					boxShadow: "initial",
				}}
				transition={{
					duration: 1,
				}}
				className='md:h-18 mx-auto mb-2 flex h-16 w-full flex-shrink-0 items-center justify-between rounded-xl  p-3'>
				<div className='mr-4 flex h-14 w-28 flex-col p-2 text-left'>
					<p className='text-md h-auto w-full pr-4 font-bold text-gray-500 md:text-lg'>
						{dayName}
					</p>
					<p className='h-10 w-full pr-4 text-sm font-semibold text-gray-400'>
						{date?.split("-").splice(2, 1)},
						{months[Number(date?.split("-").splice(1, 1))]}
					</p>
				</div>
				<p className='-ml-12 h-auto w-24 p-6 text-left text-lg font-bold text-gray-500'>
					{dailyContext?.tempIn[0] === "C" ? `${tempc}°C` : `${tempf}°F`}
				</p>
				<img src={icon} alt='' className='h-14 w-14 xl:hidden 2xl:block' />
			</motion.li>
		</>
	);
}

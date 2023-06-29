import { motion } from "framer-motion";
import humidity from "../../assets/images/icons8-humidity-96.png";

export default function Humidity() {
	return (
		<>
			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				whileInView={{ opacity: 1, scale: 1 }}
				transition={{ duration: 1 }}
				className='flex h-32 w-52 flex-col items-center justify-center p-2 md:h-40'>
				<img
					src={humidity}
					alt='condition'
					className='mb-2 h-16 w-16 md:h-24 md:w-24'
				/>
			</motion.div>
		</>
	);
}

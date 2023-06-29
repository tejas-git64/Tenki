import home from "../../../assets/images/icons8-home-48.png";
import map from "../../../assets/images/icons8-map-48.png";
import saved from "../../../assets/images/icons8-star-48.png";
import logo from "../../../assets/images/icons8-rain-cloud.gif";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Nav() {
	const variants = {
		open: {
			transition: { staggerChildren: 0.07, delayChildren: 0.2 },
		},
		closed: {
			transition: { staggerChildren: 0.05, staggerDirection: -1 },
		},
	};

	const [selectedId, setSeletedId] = useState(0);
	function select(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
		setSeletedId(Number(event.currentTarget.id));
	}

	return (
		<>
			<motion.div
				variants={variants}
				className={`hidden h-[calc(100vh-0vh)] w-[calc(100%-80%)] overflow-y-scroll bg-white xl:block`}>
				<img src={logo} alt='logo' className='ml-4 mt-4' />
				<h2 className='mb-20 mt-10 p-3 px-6 text-2xl font-bold'>Dashboard</h2>
				<motion.ul
					variants={variants}
					initial={{
						opacity: 0,
					}}
					whileInView={{
						opacity: 1,
					}}
					transition={{
						duration: 0.5,
					}}
					className='h-auto w-full'>
					<motion.li id='0' onClick={select} className='mb-1 h-20 w-full'>
						<NavLink
							to='/'
							className={`flex h-16 items-center justify-start pl-[2vw] ${
								selectedId === 0 ? "selected" : ""
							}`}>
							<img src={home} alt='home' className='mx-4 mr-10 h-8 w-8' />
							<p className='text-[20px] font-semibold text-gray-600'>Home</p>
						</NavLink>
					</motion.li>
					<motion.li id='1' onClick={select} className='mb-1 h-20 w-full'>
						<NavLink
							to='/map'
							className={`${
								selectedId === 1 ? "selected" : ""
							} flex h-16 items-center  justify-start pl-[2vw]`}>
							<img src={map} alt='map' className='mx-4 mr-10 h-8 w-8' />
							<p className='text-[20px] font-semibold text-gray-600'>
								Map search
							</p>
						</NavLink>
					</motion.li>
					<motion.li id='2' onClick={select} className='mb-1 h-20 w-full'>
						<NavLink
							to='/saved'
							className={`flex h-16 items-center justify-start pl-[2vw] ${
								selectedId === 2 ? "selected" : ""
							}`}>
							<img src={saved} alt='saved' className='mx-4 mr-10 h-8 w-8' />
							<p className='overflow-x-hidden whitespace-nowrap text-[20px] font-semibold text-gray-600'>
								Saved locations
							</p>
						</NavLink>
					</motion.li>
				</motion.ul>
			</motion.div>
		</>
	);
}

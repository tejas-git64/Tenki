import forecast from "../../../assets/images/icons8-trend-48.png";
import saved from "../../../assets/images/icons8-star-48.png";
import map from "../../../assets/images/icons8-map-48.png";
import home from "../../../assets/images/icons8-home-48.png";
import { NavLink } from "react-router-dom";

export default function MobileNav() {
	return (
		<>
			<div className='fixed bottom-0 z-10 w-full border-t-2 bg-white md:hidden'>
				<ul className='flex h-20 w-full list-none items-center justify-around'>
					<li>
						<NavLink
							to='/'
							className='h-10 w-10 bg-transparent p-0 outline-none'>
							<img src={home} alt='calendar' className='mx-0.5 w-8' />
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/forecast'
							className='h-10 w-10 bg-transparent p-0 outline-none'>
							<img src={forecast} alt='forecast' className='mx-1 w-8' />
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/saved'
							className='h-10 w-10 bg-transparent p-0 outline-none'>
							<img src={saved} alt='saved' className='mx-0.5 w-8' />
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/map'
							className='h-10 w-10 bg-transparent p-0 outline-none'>
							<img src={map} alt='map' className='mx-1 w-8' />
						</NavLink>
					</li>
				</ul>
			</div>
		</>
	);
}

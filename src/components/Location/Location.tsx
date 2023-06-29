/* eslint-disable no-mixed-spaces-and-tabs */
import { useContext, useState } from "react";
import { AppContext } from "../../App";
import { useNavigate } from "react-router";
import starred from "../../assets/images/icons8-stared-48.png";
import unStarred from "../../assets/images/icons8-not-starred-48.png";
import { Result } from "../Characteristics/Home";

export default function Location({ name, country, lat, lon, add }: Result[0]) {
	const resContext = useContext(AppContext);
	const navigate = useNavigate();
	const [isStarred, setIsStarred] = useState(false);

	function setLocation(lat: number, lon: number) {
		resContext?.data[1]((prev) =>
			prev
				? {
						...prev,
						location: {
							lat: lat,
							lon: lon,
							name: prev.location.name,
							region: prev.location.region,
							country: prev.location.country,
							tz_id: prev.location.tz_id,
							localtime_epoch: prev.location.localtime_epoch,
							localtime: prev.location.localtime,
						},
				  }
				: prev
		);
		navigate("/");
	}

	function addOrRemove() {
		if (isStarred === true || add) {
			resContext?.saved[1](
				resContext?.saved[0].filter((save) => save.name !== name)
			);
		} else {
			resContext?.saved[1]((prev) => [
				{
					name: name,
					country: country,
					lat: lat,
					lon: lon,
					add: true,
				},
				...prev,
			]);
		}
	}

	function saved(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault();
		e.stopPropagation();
		setIsStarred((prev) => !prev);
		addOrRemove();
	}

	return (
		<>
			<div
				onClick={() => setLocation(lat, lon)}
				className='flex h-16 w-full items-center justify-between rounded-md px-6 shadow-sm'>
				<div className='flex h-full w-20 flex-col items-start justify-center md:w-auto'>
					<strong className='whitespace-nowrap text-lg text-gray-500 md:text-xl'>
						{name}
					</strong>
					<p className='text-md whitespace-nowrap font-medium text-gray-300'>
						{country}
					</p>
				</div>
				<div className='hidden h-full w-32 flex-col items-start justify-center md:flex md:w-96 md:flex-row md:items-center md:justify-evenly'>
					<p className='font-medium text-gray-300 md:text-lg'>
						Latitude: <strong className='font-bold text-gray-500'>{lat}</strong>
					</p>
					<p className='font-medium text-gray-300 md:text-lg'>
						Longitude:{" "}
						<strong className='font-bold text-gray-500'>{lon}</strong>
					</p>
				</div>
				<button
					onClick={(e) => saved(e)}
					className='border-none bg-transparent p-0 outline-none'>
					<img src={add ? starred : unStarred} alt='save' className='h-6 w-6' />
				</button>
			</div>
		</>
	);
}

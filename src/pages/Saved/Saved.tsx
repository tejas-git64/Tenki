/* eslint-disable no-mixed-spaces-and-tabs */
import { Suspense, useContext } from "react";
import { AppContext } from "../../App";
import Location from "../../components/Location/Location";
import { Props } from "../../components/Characteristics/Home";

export default function Saved() {
	const savedContext = useContext(AppContext);
	const saved = localStorage.getItem("saved") || "";
	const stored = JSON.parse(saved);

	//This is to show instead of no location saves
	function fallbackui() {
		return (
			<>
				<div className='h-auto w-full border-2'>
					<p>No saved locations...</p>
				</div>
			</>
		);
	}

	return (
		<>
			<div
				className={`max-h-auto h-[calc(100vh-0vh)] w-full overflow-y-scroll border-x-2 bg-white bg-cover bg-center bg-no-repeat p-4 md:px-10 md:py-6 xl:w-[calc(100%-40%)]`}>
				<h2 className='mb-10 pl-4 text-left text-[25px] font-bold md:pl-0 md:text-2xl'>
					Saved Locations
				</h2>
				<Suspense>
					<ul className='flex h-auto w-full flex-col p-2'>
						{savedContext?.saved[0]
							? savedContext?.saved[0]?.map((location) => (
									<Location
										key={location.name}
										name={location.name}
										country={location.country}
										lat={location.lat}
										lon={location.lon}
										add={true}
									/>
							  ))
							: stored
							? stored.map((location: Props["location"]) => (
									<Location
										key={location.name}
										name={location.name}
										country={location.country}
										lat={location.lat ? location.lat : 0}
										lon={location ? location.lon : 0}
										add={true}
									/>
							  ))
							: fallbackui()}
					</ul>
				</Suspense>
			</div>
		</>
	);
}

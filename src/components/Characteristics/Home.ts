/* eslint-disable no-mixed-spaces-and-tabs */
export type Props = {
	// prev: Props | null;
	// prevState: Props | null;
	location: {
		name: string;
		region: string;
		country: string;
		lat: number;
		lon: number;
		tz_id: string;
		localtime_epoch: number;
		localtime: string;
	};
	current: {
		last_updated_epoch: number;
		last_updated: string;
		temp_c: number;
		temp_f: number;
		is_day: number;
		condition: {
			text: string;
			icon: string;
			code: number;
		};
		wind_kph: number;
		wind_mph: number;
		wind_degree: number;
		wind_dir: string;
		precip_in: number;
		precip_mm: number;
		pressure_in: number;
		pressure_mb: number;
		air_quality: {
			co: number;
			no2: number;
			o3: number;
			so2: number;
			pm2_5: number;
			pm10: number;
			"us-epa-index": number;
			"gb-defra-index": number;
		};
		uv: number;
		humidity: number;
	};
	forecast: {
		forecastday:
			| {
					date: string;
					date_epoch: number;
					day: {
						maxtemp_c: number;
						maxtemp_f: number;
						mintemp_c: number;
						mintemp_f: number;
						avgtemp_c: number;
						avgtemp_f: number;
						maxwind_mph: number;
						maxwind_kph: number;
						totalprecip_mm: number | undefined;
						totalprecip_in: number | undefined;
						totalsnow_cm: number;
						avgvis_km: number;
						avgvis_miles: number;
						avghumidity: number;
						daily_will_it_rain: number;
						daily_chance_of_rain: number;
						daily_will_it_snow: number;
						daily_chance_of_snow: number;
						condition: {
							text: string;
							icon: string;
							code: number;
						};
						uv: number;
						air_quality: {
							co: number;
							no2: number;
							o3: number;
							so2: number;
							pm2_5: number;
							pm10: number;
						};
					};
					astro: {
						sunrise: string;
						sunset: string;
						moonrise: string;
						moonset: string;
						moon_phase: string;
						moon_illumination: string;
						is_moon_up: number;
						is_sun_up: number;
					};
					hour:
						| {
								tempIn: string | undefined;
								temp_c: number;
								temp_f: number;
								substring(arg0: number, arg1: number): string;
								time_epoch: number;
								time: string;
								is_day: number;
								condition: {
									text: string;
									icon: string;
									code: number;
								};
								wind_kph: number;
								wind_mph: number;
								wind_degree: number;
								wind_dir: string;
								precip_mm: number;
								precip_in: number;
								humidity: number;
								cloud: number;
								feelslike_c: number;
								feelslike_f: number;
								windchill_c: number;
								windchill_f: number;
								heatindex_c: number;
								heatindex_f: number;
								dewpoint_c: number;
								dewpoint_f: number;
								will_it_rain: number;
								chance_of_rain: number;
								will_it_snow: number;
								chance_of_snow: number;
								vis_km: number;
								vis_miles: number;
								gust_mph: number;
								gust_kph: number;
								uv: number;
								air_quality: {
									co: number;
									no2: number;
									o3: number;
									so2: number;
									pm2_5: number;
									pm10: number;
								};
						  }[]
						| [];
			  }[]
			| [];
	} | null;
	alerts: {
		alert: [];
	} | null;
};

export type Coords = {
	coords: {
		latitude: number;
		longitude: number;
		accuracy: number;
	};
};

export type Result = {
	name: string;
	country: string;
	lat: number;
	lon: number;
	add: boolean;
}[];

export type HourlyProps = {
	tempIn: string | undefined;
	time_epoch: number;
	time: string;
	temp_c: number;
	temp_f: number;
	is_day: number;
	condition: {
		text: string;
		icon: string;
		code: number;
	};
	wind_kph: number;
	wind_mph: number;
	wind_degree: number;
	wind_dir: string;
	precip_mm: number;
	precip_in: number;
	humidity: number;
	cloud: number;
	feelslike_c: number;
	feelslike_f: number;
	windchill_c: number;
	windchill_f: number;
	heatindex_c: number;
	heatindex_f: number;
	dewpoint_c: number;
	dewpoint_f: number;
	will_it_rain: number;
	chance_of_rain: number;
	will_it_snow: number;
	chance_of_snow: number;
	vis_km: number;
	vis_miles: number;
	gust_mph: number;
	gust_kph: number;
	uv: number;
	air_quality: {
		co: number;
		no2: number;
		o3: number;
		so2: number;
		pm2_5: number;
		pm10: number;
	};
}[];

export type DailyProps =
	| {
			tempc: number;
			tempf: number;
			date: string;
			icon: string;
			dayName: string;
			maxtemp_c: number;
			maxtemp_f: number;
			mintemp_c: number;
			mintemp_f: number;
			avgtemp_c: number;
			avgtemp_f: number;
			maxwind_mph: number;
			maxwind_kph: number;
			totalprecip_mm: number;
			totalprecip_in: number;
			totalsnow_cm: number;
			avgvis_km: number;
			avgvis_miles: number;
			avghumidity: number;
			daily_will_it_rain: number;
			daily_chance_of_rain: number;
			daily_will_it_snow: number;
			daily_chance_of_snow: number;
			condition: {
				text: string;
				icon: string;
				code: number;
			};
	  }
	| undefined;

export type DailyDaily = {
	tempc: number;
	tempf: number;
	dayName: string;
	date: string;
	icon: string;
};

export type Temperature = {
	tempIn: string;
};

export type AQIndex = {
	index: number;
};

export type Context = {
	data: [Props | null, React.Dispatch<React.SetStateAction<Props | null>>];
	coords: [Coords | null, React.Dispatch<React.SetStateAction<Coords | null>>];
	tempIn: [string, React.Dispatch<React.SetStateAction<string>>];
	saved: [Result, React.Dispatch<React.SetStateAction<Result>>];
};

export type getDayName = (
	dateStr: string | undefined,
	locale: string
) => string;

export type Query = {
	id: number;
	name: string;
	region: string;
	country: string;
	lat: number;
	lon: number;
	url: string;
}[];

export type Characteristic = {
	wind_degree: number | undefined;
	wind_dir: string | undefined;
	wind_kph: number | undefined;
	wind_mph: number | undefined;
	pressure_in: number | undefined;
	pressure_mb: number | undefined;
	gb_defra_index: number | undefined;
	uv: number | undefined;
	humidity: number | undefined;
};

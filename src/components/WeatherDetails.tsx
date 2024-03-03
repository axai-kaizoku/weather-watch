import { LuSunrise, LuSunset, LuEye } from 'react-icons/lu';
import { FiDroplet } from 'react-icons/fi';
import { MdAir } from 'react-icons/md';
import { ImMeter } from 'react-icons/im';

export interface WeatherDetailProps {
	visibility: string;
	humidity: string;
	windspeed: string;
	airPressure: string;
	sunrise: string;
	sunset: string;
}

export default function WeatherDetails(props: WeatherDetailProps) {
	const {
		visibility = '25km',
		humidity = '61%',
		windspeed = '7 km/h',
		airPressure = '1012 hPa',
		sunrise = '6.20',
		sunset = '18:48',
	} = props;
	return (
		<>
			<SingleWeatherDetail
				icon={<LuEye />}
				information="Visibility"
				value={props.visibility}
			/>
			<SingleWeatherDetail
				icon={<FiDroplet />}
				information="Humidity"
				value={props.humidity}
			/>
			<SingleWeatherDetail
				icon={<MdAir />}
				information="Windspeed"
				value={props.windspeed}
			/>
			<SingleWeatherDetail
				icon={<ImMeter />}
				information="AirPressure"
				value={props.airPressure}
			/>
			<SingleWeatherDetail
				icon={<LuSunrise />}
				information="Sunrise"
				value={props.sunrise}
			/>
			<SingleWeatherDetail
				icon={<LuSunset />}
				information="Sunset"
				value={props.sunset}
			/>
		</>
	);
}

export interface SingleWeatherDetailProps {
	information: string;
	icon: React.ReactNode;
	value: string;
}

function SingleWeatherDetail(props: SingleWeatherDetailProps) {
	return (
		<div className="flex flex-col items-center justify-between gap-2 text-xs font-semibold text-black/80">
			<p className="whitespace-nowrap">{props.information}</p>
			<div className="text-3xl">{props.icon}</div>
			<p>{props.value}</p>
		</div>
	);
}

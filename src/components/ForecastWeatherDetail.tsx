import convertKelvinToCelcius from '@/utils/temp-convert';
import Container from './Container';
import WeatherDetails, { WeatherDetailProps } from './WeatherDetails';
import WeatherIcon from './WeatherIcon';

export interface ForecastWeatherDetailProps extends WeatherDetailProps {
	weatherIcon: string;
	date: string;
	day: string;
	temp: number;
	feels_like: number;
	temp_min: number;
	temp_max: number;
	description: string;
}

export default function ForecastWeatherDetail(
	props: ForecastWeatherDetailProps,
) {
	const {
		weatherIcon = '02d',
		date = '19.09',
		day = 'Tuesday',
		temp,
		feels_like,
		temp_min,
		temp_max,
		description,
	} = props;
	return (
		<Container className="gap-4 ">
			<section className="flex items-center gap-4 px-4">
				<div className="flex flex-col items-center gap-1">
					<WeatherIcon iconName={weatherIcon} />
					<p>{date}</p>
					<p className="text-sm">{day}</p>
				</div>
				<div className="flex flex-col px-4">
					<span className="text-5xl">{convertKelvinToCelcius(temp ?? 0)}°</span>
					<p className="space-x-1 text-xs whitespace-nowrap">
						<span>Feels like</span>
						<span>{convertKelvinToCelcius(feels_like ?? 0)}°</span>
					</p>
					<p className="capitalize">{description}</p>
				</div>
			</section>
			<section className="flex justify-between w-full gap-4 px-4 pr-10 overflow-x-auto">
				<WeatherDetails {...props} />
			</section>
		</Container>
	);
}

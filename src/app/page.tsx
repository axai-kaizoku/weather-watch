'use client';

import { useQuery } from '@tanstack/react-query';
import WeatherData from '@/types/weather-type';
import axios from 'axios';
import { format, fromUnixTime, parseISO } from 'date-fns';
import Container from '@/components/Container';
import convertKelvinToCelcius from '@/utils/temp-convert';
import WeatherIcon from '@/components/WeatherIcon';
import getDayOrNightIcon from '@/utils/config-icon';
import WeatherDetails from '@/components/WeatherDetails';
import metersToKilometers from '@/utils/distance-convert';
import convertWindSpeed from '@/utils/wind-speed-convert';
import ForecastWeatherDetail from '@/components/ForecastWeatherDetail';
import { useAtom } from 'jotai';
import { loadingCityAtom, placeAtom } from './atom';
import { useEffect } from 'react';

export default function Home() {
	const [place, setPlace] = useAtom(placeAtom);
	const [loadingCity] = useAtom(loadingCityAtom);

	const { isPending, error, data, refetch } = useQuery<WeatherData>({
		queryKey: ['repoData'],
		queryFn: async () => {
			const { data } = await axios.get(
				`https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`,
			);
			return data;
		},
	});

	useEffect(() => {
		refetch();
	}, [place, refetch]);

	if (isPending)
		return (
			<div className="flex items-center justify-center min-h-screen">
				Loading..
			</div>
		);
	if (error) return 'An error has occurred: ' + error.message;

	const firstData = data?.list[0];

	const uniqueDates = [
		...new Set(
			data?.list.map(
				(entry) => new Date(entry.dt * 1000).toISOString().split('T')[0],
			),
		),
	];

	const firstDataForEachDate = uniqueDates.map((date) => {
		return data?.list.find((entry) => {
			const entryDate = new Date(entry.dt * 1000).toISOString().split('T')[0];
			const entryTime = new Date(entry.dt * 1000).getHours();
			return entryDate === date && entryTime >= 6;
		});
	});

	return (
		<div className="flex flex-col w-full px-3 pt-4 pb-10 mx-auto max-w-7xl gap-9">
			{loadingCity ? (
				<>
					<WeatherSkeleton />
				</>
			) : (
				<>
					<section className="space-y-4">
						<div className="space-y-2">
							<h2 className="flex items-end gap-1 text-2xl">
								<p>{format(parseISO(firstData?.dt_txt ?? ''), 'EEEE')}</p>
								<p className="text-lg">
									{format(parseISO(firstData?.dt_txt ?? ''), 'dd.MM.yyyy')}
								</p>
							</h2>
							<Container className="items-center gap-10 px-6">
								<div className="flex flex-col items-center px-4">
									<span className="text-5xl">
										{convertKelvinToCelcius(firstData?.main.temp ?? 267.83)}°
									</span>
									<p className="space-x-1 text-xs whitespace-nowrap">
										<span>Feels like</span>
										<span>
											{convertKelvinToCelcius(firstData?.main.feels_like ?? 0)}°
										</span>
									</p>
									<p className="space-x-2 text-xs">
										<span>
											{convertKelvinToCelcius(firstData?.main.temp_min ?? 0)}°↓{' '}
										</span>
										<span>
											{convertKelvinToCelcius(firstData?.main.temp_max ?? 0)}°↑{' '}
										</span>
									</p>
								</div>
								<div className="flex justify-between w-full gap-10 pr-3 overflow-x-auto sm:gap-16">
									{data?.list.map((d, i) => (
										<div
											key={i}
											className="flex flex-col items-center justify-between gap-2 text-xs font-semibold">
											<p className="whitespace-nowrap">
												{format(parseISO(d.dt_txt), 'h:mm a')}
											</p>
											<WeatherIcon
												iconName={getDayOrNightIcon(
													d.weather[0].icon,
													d.dt_txt,
												)}
											/>
											<p>{convertKelvinToCelcius(d?.main.temp ?? 0)}°</p>
										</div>
									))}
								</div>
							</Container>
						</div>
						<div className="flex gap-4">
							<Container className="flex-col items-center justify-center px-4 w-fit">
								<p className="text-center capitalize">
									{firstData?.weather[0].description}
								</p>
								<WeatherIcon
									iconName={getDayOrNightIcon(
										firstData?.weather[0].icon ?? '',
										firstData?.dt_txt ?? '',
									)}
								/>
							</Container>
							<Container className="justify-between gap-4 px-6 overflow-x-auto bg-yellow-100">
								<WeatherDetails
									airPressure={`${firstData?.main.pressure} hPa`}
									visibility={metersToKilometers(
										firstData?.visibility ?? 10000,
									)}
									humidity={`${firstData?.main.humidity}%`}
									sunrise={format(
										fromUnixTime(data?.city.sunrise ?? 170294952),
										'H:mm',
									)}
									sunset={format(
										fromUnixTime(data?.city.sunset ?? 1702517657),
										'H:mm',
									)}
									windspeed={convertWindSpeed(firstData?.wind.speed ?? 1.64)}
								/>
							</Container>
						</div>
					</section>
					{/* 7 days data */}
					<section className="flex flex-col w-full gap-4">
						<p className="text-2xl">Forecast (7 days)</p>
						{firstDataForEachDate.map((d, i) => (
							<ForecastWeatherDetail
								key={i}
								description={d?.weather[0].description ?? ''}
								weatherIcon={d?.weather[0].icon ?? '01d'}
								date={d ? format(parseISO(d.dt_txt), 'dd.MM') : ''}
								day={d ? format(parseISO(d.dt_txt), 'dd.MM') : 'EEEE'}
								feels_like={d?.main.feels_like ?? 0}
								temp={d?.main.temp ?? 0}
								temp_max={d?.main.temp_max ?? 0}
								temp_min={d?.main.temp_min ?? 0}
								airPressure={`${d?.main.pressure} hPa `}
								humidity={`${d?.main.humidity}% `}
								sunrise={format(
									fromUnixTime(data?.city.sunrise ?? 1702517657),
									'H:mm',
								)}
								sunset={format(
									fromUnixTime(data?.city.sunset ?? 1702517657),
									'H:mm',
								)}
								visibility={`${metersToKilometers(d?.visibility ?? 10000)} `}
								windspeed={`${convertWindSpeed(d?.wind.speed ?? 1.64)} `}
							/>
						))}
					</section>
				</>
			)}
		</div>
	);
}

function WeatherSkeleton() {
	return (
		<section className="space-y-8 ">
			{/* Today's data skeleton */}
			<div className="space-y-2 animate-pulse">
				{/* Date skeleton */}
				<div className="flex gap-1 text-2xl items-end ">
					<div className="h-6 w-24 bg-gray-300 rounded"></div>
					<div className="h-6 w-24 bg-gray-300 rounded"></div>
				</div>

				{/* Time wise temperature skeleton */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					{[1, 2, 3, 4].map((index) => (
						<div
							key={index}
							className="flex flex-col items-center space-y-2">
							<div className="h-6 w-16 bg-gray-300 rounded"></div>
							<div className="h-6 w-6 bg-gray-300 rounded-full"></div>
							<div className="h-6 w-16 bg-gray-300 rounded"></div>
						</div>
					))}
				</div>
			</div>

			{/* 7 days forecast skeleton */}
			<div className="flex flex-col gap-4 animate-pulse">
				<p className="text-2xl h-8 w-36 bg-gray-300 rounded"></p>

				{[1, 2, 3, 4, 5, 6, 7].map((index) => (
					<div
						key={index}
						className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
						<div className="h-8 w-28 bg-gray-300 rounded"></div>
						<div className="h-10 w-10 bg-gray-300 rounded-full"></div>
						<div className="h-8 w-28 bg-gray-300 rounded"></div>
						<div className="h-8 w-28 bg-gray-300 rounded"></div>
					</div>
				))}
			</div>
		</section>
	);
}

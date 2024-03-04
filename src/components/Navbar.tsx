'use client';

import { MdMyLocation, MdOutlineLocationOn, MdWbSunny } from 'react-icons/md';
import SearchBox from './SearchBox';
import { useState } from 'react';
import axios from 'axios';
import { loadingCityAtom, placeAtom } from '@/app/atom';
import { useAtom } from 'jotai';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

export default function Navbar() {
	const [city, setCity] = useState('');
	const [error, setError] = useState('');

	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [place, setPlace] = useAtom(placeAtom);
	const [_, setLoadingCity] = useAtom(loadingCityAtom);

	const handleInputChange = async (value: string) => {
		setCity(value);
		if (value.length >= 3) {
			try {
				const response = await axios.get(
					`https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${API_KEY}`,
				);

				const suggestions = response.data.list.map((item: any) => item.name);
				setSuggestions(suggestions);
				setError('');
				setShowSuggestions(true);
			} catch (error) {
				setSuggestions([]);
				setShowSuggestions(false);
			}
		} else {
			setSuggestions([]);
			setShowSuggestions(false);
		}
	};

	function handleSubmitSearch(e: any) {
		e.preventDefault();
		setLoadingCity(true);
		if (suggestions.length == 0) {
			setError('Location not found');
			setLoadingCity(false);
		} else {
			setError('');
			setTimeout(() => {
				setLoadingCity(false);

				setPlace(city);
				setShowSuggestions(false);
			}, 500);
		}
	}

	function handleSuggestionClick(value: string) {
		setCity(value);
		setShowSuggestions(false);
	}

	function handleCurrentLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(async (position) => {
				const { longitude, latitude } = position.coords;
				try {
					setLoadingCity(true);
					const res = await axios.get(
						`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`,
					);
				} catch (error) {
					setLoadingCity(false);
				}
			});
		}
	}

	return (
		<>
			<nav className="sticky top-0 left-0 z-50 bg-white shadow-sm">
				<div className="flex items-center justify-between w-full h-16 px-3 mx-auto max-w-7xl">
					<p className="flex items-center justify-center gap-2">
						<h2 className="text-3xl text-gray-700">Weather</h2>
						<MdWbSunny className="mt-1 text-3xl text-yellow-300" />
					</p>
					<section className="flex items-center gap-2">
						<MdMyLocation
							title="Your current location"
							onClick={handleCurrentLocation}
							className="text-2xl text-gray-600 cursor-pointer hover:opacity-80"
						/>
						<MdOutlineLocationOn className="text-3xl text-gray-700" />
						<p className="text-sm text-slate-900/80">{place}</p>
						<div className="relative hidden md:flex">
							<SearchBox
								value={city}
								onSubmit={(e) => handleSubmitSearch(e)}
								onChange={(e) => handleInputChange(e.target.value)}
							/>
							<SuggestionBox
								{...{
									showSuggestions,
									suggestions,
									handleSuggestionClick,
									error,
								}}
							/>
						</div>
					</section>
				</div>
			</nav>
			<section className="flex max-w-7xl px-3 md:hidden">
				<div className="relative ">
					<SearchBox
						value={city}
						onSubmit={(e) => handleSubmitSearch(e)}
						onChange={(e) => handleInputChange(e.target.value)}
					/>
					<SuggestionBox
						{...{
							showSuggestions,
							suggestions,
							handleSuggestionClick,
							error,
						}}
					/>
				</div>
			</section>
		</>
	);
}

function SuggestionBox({
	showSuggestions,
	suggestions,
	handleSuggestionClick,
	error,
}: {
	showSuggestions: boolean;
	suggestions: string[];
	handleSuggestionClick: (item: string) => void;
	error: string;
}) {
	return (
		<>
			{((showSuggestions && suggestions.length > 1) || error) && (
				<ul className="absolute left-0 flex flex-col gap-1 px-2 py-2 mb-4 bg-white border border-gray-300 rounded-md top-11 min-w-52">
					{error && suggestions.length < 1 && (
						<li className="p-1 text-red-500">{error}</li>
					)}
					{suggestions.map((item, i) => (
						<li
							key={i}
							className="p-1 rounded cursor-pointer hover:bg-gray-200"
							onClick={() => handleSuggestionClick(item)}>
							{item}
						</li>
					))}
				</ul>
			)}
		</>
	);
}

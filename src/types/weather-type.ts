//https://api.openweathermap.org/data/2.5/forecast?q=pune&appid=39eea2261beb02f39984b6ec9730bd35&cnt=56

type WeatherData = {
	cod: string;
	message: number;
	cnt: number;
	list: {
		dt: number;
		main: {
			temp: number;
			feels_like: number;
			temp_min: number;
			temp_max: number;
			pressure: number;
			sea_level: number;
			grnd_level: number;
			humidity: number;
			temp_kf: number;
		};
		weather: { id: number; main: string; description: string; icon: string };
		clouds: {
			all: number;
		};
		wind: {
			speed: number;
			deg: number;
			gust: number;
		};
		visibility: number;
		pop: number;
		sys: {
			pod: string;
		};
		dt_txt: string;
	};
	city: {
		id: number;
		name: string;
		coord: {
			lat: number;
			long: number;
		};
		country: string;
		population: number;
		sunrise: number;
		sunset: number;
	};
};

export default WeatherData;

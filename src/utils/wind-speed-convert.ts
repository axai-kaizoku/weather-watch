function convertWindSpeed(speedInMetersPerSec: number): string {
	const speedInKilometersPerHour = speedInMetersPerSec * 3.6;
	return `${speedInKilometersPerHour.toFixed(0)}km/h`;
}

export default convertWindSpeed;

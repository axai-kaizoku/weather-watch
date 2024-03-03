function metersToKilometers(visiblityInMeters: number): string {
	const visibilityInKilometers = visiblityInMeters / 1000;
	return `${visibilityInKilometers.toFixed(0)}km`;
}

export default metersToKilometers;

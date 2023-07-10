
export default async function handler(req, res) {
	const API = process.env.API;
const res_1 = await fetch(
	`https://api.openweathermap.org/data/2.5/weather?q=${req.query.id}&units=metric&appid=${API}`,
);
const data = await res_1.json();

// Edge case: the API returns a 404 if the location isn't found
if (res_1.status === 404) {
	res.status(404).json({ error: 'Location not found' });
	return;
}

// Edge case: the API returns a 401 if the API key is invalid
if (res_1.status === 401) {
	res.status(401).json({ error: 'Invalid API key' });
	return;
}

// Edge case: the API returns a 500 if there's a server error
if (res_1.status === 500) {
	res.status(500).json({ error: 'Internal server error' });
	return;
}

// Edge case: the API returns a 400 if the location in the request is missing
if (res_1.status === 400) {
	res.status(400).json({ error: 'Missing location' });
	return;
}

const res_2 = await fetch(
	`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=metric&exclude=hourly,minutely,current,alerts&appid=${API}`,
);
const data_2 = await res_2.json();
res.json({ current: data, week: data_2 });
}


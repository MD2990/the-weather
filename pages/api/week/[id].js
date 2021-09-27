// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
	const API = process.env.API;

	const res_1 = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${req.query.id}&units=metric&appid=${API}`,
	);
	const data = await res_1.json();
	

	const res_2 = await fetch(
		`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=metric&exclude=hourly,minutely,current,alerts&appid=${API}`,
	);
	const data_2 = await res_2.json();


	res.json({ current: data, week: data_2 });
}


// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res)
{

  console.log(req.query.id);
 	const API = process.env.API;

	const ress = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${req.query.id}&units=metric&appid=${API}`,
	);
  const data = await ress.json();
  res.json({data})
}

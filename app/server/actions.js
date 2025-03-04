"use server";

import { filterDailyData } from "app/utils/filterDailyData";

export async function getData() {
	const API = process.env.API;
	if (!API) {
		return { ok: false, status: 401 };
	}
	try {
		const current = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=muscat&units=metric&appid=${API}`
		);

		if (!current.ok) {
			return { ok: false, status: 404 };
		}
		const currentData = await current.json();
		const week = await fetch(
			`https://api.openweathermap.org/data/2.5/forecast?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&units=metric&cnt=40&appid=${API}`
		);

		if (!week.ok) {
			return { ok: false, status: 404 };
		}

		const rawWeekData = await week.json();
		const weekData = filterDailyData(rawWeekData);
		return { currentData, weekData, ok: true, status: 200 };
	} catch {
		return { ok: false, status: 500 };
	}
}

export async function getByCityName(city) {
	try {
		const API = process.env.API;

		if (!API) {
			return { ok: false, status: 401 };
		}

		const current_res = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API}`
		);

		if (!current_res.ok) {
			return { ok: false, status: 404 };
		}

		// Edge case: the API returns a 404 if the location isn't found
		if (current_res.status === 404) {
			return { ok: false, status: 404 };
		}

		// Edge case: the API returns a 401 if the API key is invalid
		if (current_res.status === 401) {
			return { ok: false, status: 401 };
		}

		// Edge case: the API returns a 500 if there's a server error
		if (current_res.status === 500) {
			return { ok: false, status: 500 };
		}

		// Edge case: the API returns a 400 if the location in the request is missing
		if (current_res.status === 400) {
			return { ok: false, status: 400 };
		}
		const current = await current_res.json();
		const week = await fetch(
			`https://api.openweathermap.org/data/2.5/forecast?lat=${current.coord.lat}&lon=${current.coord.lon}&units=metric&cnt=40&appid=${API}`
		);

		if (!week.ok) {
			return { ok: false, status: 404 };
		}

		const rawWeekData = await week.json();
		const weekData = filterDailyData(rawWeekData);
		return { weekData, current, ok: true };
	} catch {
		return { ok: false, status: 500 };
	}
}

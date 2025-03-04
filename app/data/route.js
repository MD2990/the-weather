import { filterDailyData } from "app/utils/filterDailyData";
import { NextResponse } from "next/server";

export async function GET(request) {
	const API = process.env.API;
	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id");

	const current_res = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${id}&units=metric&appid=${API}`
	);

	if (!current_res.ok) {
		return NextResponse.json({ error: "not found" }, { status: 404 });
	}

	// Edge case: the API returns a 404 if the location isn't found
	if (current_res.status === 404) {
		return NextResponse.json({ error: "not found" }, { status: 404 });
	}

	// Edge case: the API returns a 401 if the API key is invalid
	if (current_res.status === 401) {
		return NextResponse.status(401).json({ error: "Invalid API key" });
	}

	// Edge case: the API returns a 500 if there's a server error
	if (current_res.status === 500) {
		return NextResponse.status(500).json({ error: "Internal server error" });
	}

	// Edge case: the API returns a 400 if the location in the request is missing
	if (current_res.status === 400) {
		return NextResponse.status(400).json({ error: "Missing location" });
	}
	const current = await current_res.json();
	const week = await fetch(
		`https://api.openweathermap.org/data/2.5/forecast?lat=${current.coord.lat}&lon=${current.coord.lon}&units=metric&cnt=40&appid=${API}`
	);

	if (!week.ok) {
		const error = await week.json();
		throw new Error(error.message || "API Error");
	}

	const rawWeekData = await week.json();
	const weekData = filterDailyData(rawWeekData);
	return NextResponse.json({ current, weekData });
}

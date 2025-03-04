import Main from "@components/Main";
import Weekly from "@components/Weekly";
import React from "react";
import { filterDailyData } from "./utils/filterDailyData";
import Swal from "sweetalert2";

async function getData() {
	const API = process.env.API;
	if (!API) {
		throw new Error("API key not found");
	}
	try {
		const current = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=sohar&units=metric&appid=${API}`
		);

		if (!current.ok) {
			const error = await current.json();
			throw new Error(error.message || "API Error");
		}
		const currentData = await current.json();
		const week = await fetch(
			`https://api.openweathermap.org/data/2.5/forecast?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&units=metric&cnt=40&appid=${API}`
		);

		if (!week.ok) {
			const error = await week.json();
			throw new Error(error.message || "API Error");
		}

		const rawWeekData = await week.json();
		const weekData = filterDailyData(rawWeekData);
		return { currentData, weekData };
	} catch {
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: "Something went wrong! Please check your connection and try again ",
		});
	}
}

export default async function page() {
	const { currentData, weekData } = await getData();

	return (
		<>
			<Main currentData={currentData} />
			<Weekly weekData={weekData} />
		</>
	);
}

"use client";
import { Wrap } from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import { useSnapshot } from "valtio";
import state from "../store";
import { WeatherCard } from "./WeatherCard";

export default function Weekly({ weekData }) {
	const snap = useSnapshot(state);

	useEffect(() => {
		state.week = weekData;
	}, [weekData]);

	const data = useMemo(
		() => (state.week.length ? snap.week : weekData),
		[snap.week, weekData]
	);

	return (
		<Wrap spacing={4} justify="center" p="4">
			{data?.map((day, index) => (
				<WeatherCard key={day.dt} data={day} index={index} />
			))}
		</Wrap>
	);
}

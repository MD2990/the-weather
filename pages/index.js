import Head from 'next/head'
import { useEffect } from 'react';
import state from '../store';

import Main from './../components/Main';

export default function Home({ currentData, weekData }) {
	useEffect(() => {
		state.current = currentData;
		state.week = weekData;
	}, [currentData, weekData]);
	return (
		<div>
			<Head>
				<title>The Weather</title>
				<meta name='description' content='Simple weather app' />

				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Main currentData={currentData} weekData={weekData} />
		</div>
	);
}
export async function getServerSideProps() {
	const API = process.env.API;

	const current = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=muscat&units=metric&appid=${API}`,
	);
	const currentData = await current.json();
	const week = await fetch(
		`https://api.openweathermap.org/data/2.5/onecall?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&units=metric&exclude=hourly,minutely,current,alerts&appid=${API}`,
	);
	const weekData = await week.json();

	if (!currentData || !weekData) {
		return {
			notFound: true,
		};
	}

	return {
		props: { currentData, weekData }, // will be passed to the page component as props
	};
}
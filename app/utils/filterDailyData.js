export function filterDailyData(weekData) {
	if (!weekData.list) return [];

	const dailyData = [];
	
	const seenDates = new Set();

	weekData.list.forEach((item) => {
		const date = item.dt_txt.split(" ")[0];
		const hour = item.dt_txt.split(" ")[1];

		// Get the reading closest to noon (12:00:00) for each day
		if (!seenDates.has(date) && hour === "12:00:00") {
			seenDates.add(date);
			dailyData.push(item);
		}
	});

	return dailyData;
}

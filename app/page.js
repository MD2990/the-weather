import Main from "@components/Main";
import Weekly from "@components/Weekly";
import React from "react";
import { getData } from "./server/actions";
import { notFound } from "next/navigation";

export default async function page() {
	const { currentData, weekData, ok } = await getData();
	if (!ok) {
		return notFound();
	}

	return (
		<>
			<Main currentData={currentData} />
			<Weekly weekData={weekData} />
		</>
	);
}

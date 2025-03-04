import React from "react";
import { VStack, Input, Button } from "@chakra-ui/react";
import { useSnapshot } from "valtio";
import state from "../store";
import Swal from "sweetalert2";
import { TiWeatherStormy } from "react-icons/ti";
import { InputGroup } from "./ui/input-group";
import { LuCloudSun } from "react-icons/lu";
import { getByCityName } from "app/server/actions";

export default function SearchInput() {
	const snap = useSnapshot(state);

	const handelSubmit = () => {
		if (!state.city.trim() || state.city.trim().length <= 2)
			return Swal.fire({
				icon: "info",
				title: "Oops...",
				text: "Please enter some more characters to get your city's info ",
			});

		getWeeklyData();
	};
	return (
		<VStack m="1" mt="2rem" justify={"center"} gap={1}>
			<InputGroup
				flex="1"
				startElement={
					<LuCloudSun
						style={{
							marginLeft: "0.5rem",
						}}
					/>
				}
			>
				<Input
					flex={1}
					type="search"
					placeholder="Enter your city name"
					size={["xs", "sm", "md", "lg"]}
					onChange={(e) => {
						state.city = e.target.value;
					}}
					// on enter press
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							handelSubmit();
						}
					}}
				/>
			</InputGroup>

			<Button
				p={"1rem"}
				colorPalette={"teal"}
				onClick={handelSubmit}
				size={["xs", "sm", "md", "lg"]}
				loading={snap.isLoading}
				disabled={snap.isLoading || snap.city.trim().length <= 2}
				loadingText={`Getting the weather for ${snap.city.toLocaleUpperCase()}`}
			>
				<TiWeatherStormy size="2rem" color="lightGreen" />
				Get the weather
			</Button>
		</VStack>
	);
}
async function getWeeklyData() {
	try {
		state.isLoading = true;
		const { ok, current, status, weekData } = await getByCityName(state.city);

		if (!ok) {
			state.isLoading = false;
			return Swal.fire({
				icon: "error",
				title: `Status code: ${status}`,
				text: `${state.city.toLocaleUpperCase()} not found! Please check your city name and try again `,
			});
		}

		state.week = weekData;
		state.currentData = current;
		state.isLoading = false;
	} catch (error) {
		Swal.fire({
			icon: "error",
			title: `Oops... ${error.message}`,
			text: "Something went wrong! Please check your city name and try again ",
		});
	} finally {
		state.isLoading = false;
	}
}

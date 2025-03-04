import { Center, Box, Spinner, HStack, Stat } from "@chakra-ui/react";
import React, { useEffect, memo } from "react";
import Image from "next/image";
import round from "../lib/functions";
import { useSnapshot } from "valtio";
import state from "../store";
import { WeatherLabel } from "./WeatherLabel";
import PropTypes from "prop-types";

const StatsCard = ({ currentData }) => {
	const snap = useSnapshot(state);

	useEffect(() => {
		state.currentData = currentData;
	}, [currentData]);

	const data = snap.currentData?.weather || currentData?.weather?.map((w) => w);
	const { description, icon } = data ? data[0] : {};
	const { feels_like, temp_min, temp_max, humidity } = currentData?.main || {};
	const fontSize = { base: "2xl", lg: "6xl", md: "5xl", sm: "4xl" };

	return (
		<Center
			px={{ base: 4, md: 8 }}
			py={"8"}
			className="im"
			shadow={"2xl"}
			borderColor={"gray.400"}
			rounded={"lg"}
		>
			<Stat.Root>
				<Box textAlign="center" p="2">
					<Stat.Label
						fontSize={fontSize}
						fontWeight="hairline"
						color="green.200"
						mr={[1, 2, 3, 4]}



					>
						{feels_like ? round(feels_like) : <Spinner />}
					</Stat.Label>
					<Stat.ValueUnit
						fontSize={fontSize}
						fontWeight={"extrabold"}
						color="green.100"
					>
						{state.city?.toLocaleUpperCase() || currentData?.name}
					</Stat.ValueUnit>
					{icon ? (
						<Image
							src={`http://openweathermap.org/img/wn/${icon}.png`}
							alt={description || "weather icon"}
							width={52}
							height={52}
							onError={(e) => {
								e.target.src = "/fallback-weather-icon.png";
							}}
						/>
					) : (
						<Spinner />
					)}

					<Stat.Label
						textTransform="capitalize"
						fontSize="xl"
						color="green.100"
						fontWeight={"medium"}
						isTruncated
						mt="-4"
						mb="8"
					>
						{description}
					</Stat.Label>
				</Box>

				<HStack justify="space-around" spacing={[1, 2, 3, 4]}>
					<WeatherLabel>
						Min {temp_min ? round(temp_min) : <Spinner />}
					</WeatherLabel>
					<WeatherLabel>
						Max {temp_max ? round(temp_max) : <Spinner />}
					</WeatherLabel>
					<WeatherLabel>Humidity {humidity || <Spinner />}</WeatherLabel>
				</HStack>
			</Stat.Root>
		</Center>
	);
};

StatsCard.propTypes = {
	currentData: PropTypes.shape({
		weather: PropTypes.array,
		main: PropTypes.shape({
			feels_like: PropTypes.number,
			temp_min: PropTypes.number,
			temp_max: PropTypes.number,
			humidity: PropTypes.number,
		}),
		name: PropTypes.string,
	}),
};

export default memo(StatsCard);

import { Box, Text, Wrap, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { Item } from "./WeatherItem";

export const WeatherCard = ({ data, index }) => {
	const ds = new Date(data.dt * 1000).toLocaleDateString();
	const theDay = new Date(data.dt * 1000).toLocaleString("en-us", {
		weekday: "long",
	});
	const { temp_min: min, temp_max: max, temp: current } = data.main;

	return (
		<Wrap
			className="im2"
			borderRadius="xl"
			justify="center"
			w={["10rem", "15rem", "20rem"]}
		>
			<VStack
				textAlign="center"
				justify="center"
				boxShadow="xl"
				rounded="2xl"
				w="full"
			>
				{data.weather.map((w) => (
					<Box key={w.id} p="2" fontSize={["xl"]} px={[2, 4, 6, 8]}>
						<Box display="flex" alignItems="center" justifyContent="center">
							<Text
								fontFamily="serif"
								fontSize={["xx-small", "sm"]}
								color="gray.600"
								textShadow="0px 1px 10px white"
							>
								{index === 0 ? "Today" : theDay} {ds}
							</Text>
							<Image
								src={`http://openweathermap.org/img/w/${w.icon}.png`}
								alt={w.description}
								quality={100}
								width={50}
								height={50}
							/>
						</Box>
						<Text
							fontSize={["xx-small", "sm", "md", "lg"]}
							color="gray.200"
							fontWeight="bold"
							textTransform="capitalize"
							noOfLines={1}
						>
							{w.description}
						</Text>
					</Box>
				))}

				<Wrap
					w="full"
					spacing={[1, 2, 3, 4]}
					p={[1, 2, 3, 4]}
					justify="space-evenly"
				>
					<Item color="#fa2c07" attr={max} Icons={FaTemperatureHigh} />
					<Item color="#07fae2" attr={min} Icons={FaTemperatureLow} />
					<Item color="yellow" attr={current} Icons={FiSun} />
				</Wrap>
			</VStack>
		</Wrap>
	);
};

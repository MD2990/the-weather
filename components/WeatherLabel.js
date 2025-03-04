import { Stat } from "@chakra-ui/react";
import PropTypes from "prop-types";

export const WeatherLabel = ({ children }) => (
	<Stat.ValueUnit
		overflow="hidden"
		textOverflow="ellipsis"
		whiteSpace="nowrap"
		fontSize={{ base: "sm", lg: "lg", md: "md", sm: "xs" }}
		fontWeight="light"
		color="cyan.200"
	>
		{children}
	</Stat.ValueUnit>
);

WeatherLabel.propTypes = {
	children: PropTypes.node.isRequired,
};

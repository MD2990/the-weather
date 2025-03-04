import { Text, WrapItem } from "@chakra-ui/react";
import round from "../lib/functions";

export const Item = ({ color, attr, Icons, times }) => (
	<WrapItem>
		<Text
			textAlign="center"
			color="gray.200"
			fontSize={{ base: "sm", lg: "md", md: "sm", sm: "xs" }}
		>
			<Icons color={color} size="2.0rem" /> {attr ? round(attr) : times}
		</Text>
	</WrapItem>
);

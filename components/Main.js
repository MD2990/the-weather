"use client";
import React from "react";
import {VStack, Wrap } from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import StatsCard from "./StatsCard";




export default function Main({ currentData }) {
	return (
		<VStack
			m="2"
			p="2"
			userSelect="none"
			justify={"center"}
			spacing={[1, 2, 3, 4]}
		>
			<SearchInput />
			<Wrap
				justify="center"
				spacing={{ base: 3, lg: 2, md: 3 }}
				mx="auto"
				p="4"
			>
				<StatsCard currentData={currentData} />
			</Wrap>
		</VStack>
	);
}

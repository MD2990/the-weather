import {
	Box,
	chakra,
	Center,
	Wrap,
	Spacer,
	Spinner,
	WrapItem,
	HStack,
} from '@chakra-ui/react';

import SearchInput from './SearchInput';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import state from '../store';
import Weekly from './Weekly';
import StatsCard from './StatsCard';


export default function Main({ currentData, weekData }) {
	const snap = useSnapshot(state);

	useEffect(() => {
		state.current = currentData;
		state.week = weekData;
	}, [currentData, weekData]);

	if (!snap.current || !snap.week) return <Center mt='20%'><Spinner/></Center>;

	return (
		<>
			<Box
				m='2'
				
				pt={5}
				px={{ base: 2, sm: 12, md: 17 }}
				userSelect='none'>
					<SearchInput />
				<Wrap
					justify='center'
					spacing={{ base: 3, lg: 2, md: 3 }}
					mx='auto'
					p='4'>
				
					

				
					<StatsCard />
				
				

					<Weekly />
				</Wrap>
			</Box>
		</>
	);
}

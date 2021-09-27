import { Box, chakra, SimpleGrid, Center } from '@chakra-ui/react';

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

	if (!snap.current || !snap.week) return <Center mt='20%'>Loading...</Center>;

	return (
		<>
			<Box
				maxW='8xl'
				mx={'auto'}
				pt={5}
				px={{ base: 2, sm: 12, md: 17 }}
				userSelect='none'>
				<SimpleGrid
					columns={1}
					spacing={{ base: 3, lg: 2, md: 3 }}
					maxH='fit-content'
					maxW='2xl'
					mx='auto'
					p='4'>
					<chakra.h1
						isTruncated
						textAlign={'center'}
						fontSize={{ base: '3xl', lg: '5xl', md: '4xl', sm: '2xl' }}
						py={8}
						className='t3'
						fontFamily='serif'
						letterSpacing='wider'
						fontWeight={'extrabold'}>
						Where should you go today?
					</chakra.h1>
					<StatsCard currentData={snap.current} />
					<Weekly />
					<SearchInput />
				</SimpleGrid>
			</Box>
		</>
	);
}

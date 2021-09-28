import { Box, Center, HStack } from '@chakra-ui/layout';
import { Stat, StatLabel, StatNumber } from '@chakra-ui/stat';
import React, { useEffect } from 'react';
import Image from 'next/image';
import state from '../store';
import round from '../lib/functions';
import { Spinner } from '@chakra-ui/spinner';

export default function StatsCard({ currentData }) {
	useEffect(() => {
		state.current = currentData;
	}, [currentData]);

	const data = currentData.weather?.map((w) => w);
	const { description, icon } = data ? data[0] : [];
	const { feels_like, temp_min, temp_max, humidity } = currentData.main || {};
	const fontSize = { base: '2xl', lg: '6xl', md: '5xl', sm: '4xl' };
	return (
		<Center
			px={{ base: 4, md: 8 }}
			py={'8'}
			className='im'
			shadow={'2xl'}
			borderColor={'gray.400'}
			rounded={'lg'}>
			<Stat>
				<Box textAlign='center' p='2'>
					<StatLabel
						className='text'
						fontSize={fontSize}
						fontWeight='extrabold'
						color='deepskyblue'>
						{feels_like ? round(feels_like) : <Spinner />}
					</StatLabel>
					<StatNumber
						fontSize={fontSize}
						fontWeight={'extrabold'}
						color='green.100'>
						{currentData.name}
					</StatNumber>
					<Image
						src={`http://openweathermap.org/img/wn/${icon}.png`}
						alt='universe'
						width={52}
						height={52}
					/>
					<StatLabel
						textTransform='capitalize'
						fontSize='xl'
						color='green.100'
						fontWeight={'medium'}
						isTruncated
						mt='-4'
						mb='8'>
						{description}
					</StatLabel>
				</Box>

				<HStack justify='space-around'>
					<StatNumber fontSize={'xl'} fontWeight='bold' color='cyan.200'>
						Min {temp_min ? round(temp_min) : <Spinner />}
					</StatNumber>

					<StatNumber fontSize={'xl'} fontWeight='bold' color='cyan.200'>
						Max: {temp_max ? round(temp_max) : <Spinner />}
					</StatNumber>
					<StatNumber fontSize={'xl'} fontWeight='bold' color='cyan.200'>
						Humidity: {humidity || <Spinner />}
					</StatNumber>
				</HStack>
			</Stat>
		</Center>
	);
}

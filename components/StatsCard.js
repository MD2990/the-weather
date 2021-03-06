import { Box, Center, HStack } from '@chakra-ui/layout';
import { Stat, StatLabel, StatNumber } from '@chakra-ui/stat';
import React, { useEffect } from 'react';
import Image from 'next/image';
import state from '../store';
import round from '../lib/functions';
import { Spinner } from '@chakra-ui/spinner';
import { useSnapshot } from 'valtio';



const Label = ({ children }) => (
	<StatNumber overflow='hidden' textOverflow='ellipsis'  whiteSpace='nowrap'
		fontSize={{ base: 'sm', lg: 'lg', md: 'md', sm: 'xs' }}
		fontWeight='light'
		color='cyan.200'>
		{children}
	</StatNumber>
);
export default function StatsCard() {

	const snap = useSnapshot(state);



	const data = snap.current?.weather?.map((w) => w);
	const { description, icon } = data ? data[0] : [];
	const { feels_like, temp_min, temp_max, humidity } = snap.current?.main || {};
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
						{snap.current?.name}
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

				<HStack justify='space-around' spacing={{base:'5',lg:'6',md:'5',sm:'2'}} >
					<Label>Min {temp_min ? round(temp_min) : <Spinner />}</Label>
					<Label> Max {temp_max ? round(temp_max) : <Spinner />}</Label>
					<Label> Humidity {humidity || <Spinner />}</Label>

			
				</HStack>
			</Stat>
		</Center>
	);
}

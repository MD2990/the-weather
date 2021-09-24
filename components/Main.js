import {
	Box,
	chakra,
	SimpleGrid,
	Stat,
	StatLabel,
	StatNumber,
	Center,
	Divider,
	Grid,
	HStack,
	VStack,
} from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import countryList from '../cont';

import Image from 'next/image';
import { Select } from '@chakra-ui/react';
import SearchInput from './SearchInput';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import state from '../store';
import axios from 'axios';
const round = (r) => Math.round(r || ' Lodging...') + '°';

function StatsCard({
	description,
	temp_min,
	temp_max,
	icon,
	feels_like,
	humidity,
	name,
	sunrise,
	sunset,
}) {
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
						fontSize='6xl'
						fontWeight='extrabold'
						color='deepskyblue'>
						{round(feels_like)}
					</StatLabel>
					<StatNumber fontSize={'5xl'} fontWeight={'medium'} color='green.50'>
						{name}
					</StatNumber>
					<Image
						src={`http://openweathermap.org/img/wn/${icon}.png`}
						alt='universe'
						width={52}
						height={52}
					/>
					<StatLabel
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
						Min {round(temp_min)}
					</StatNumber>

					<StatNumber fontSize={'xl'} fontWeight='bold' color='cyan.200'>
						Max: {round(temp_max)}
					</StatNumber>
					<StatNumber fontSize={'xl'} fontWeight='bold' color='cyan.200'>
						Humidity {humidity}
					</StatNumber>
				</HStack>
				<Divider borderColor='mediumspringgreen' />
				<HStack justify='space-around' mt='6' mb='-4'>
					<StatNumber fontSize={'sm'} fontWeight='light' color='yellow.50'>
						Sunrise {sunrise}
					</StatNumber>

					<StatNumber fontSize={'sm'} fontWeight='light' color='yellow.100'>
						Sunset {sunset}
					</StatNumber>
				</HStack>
			</Stat>
		</Center>
	);
}

export default function Main({ data }) {
	const snap = useSnapshot(state);

	useEffect(() => {
		state.weather = data.weather[0];
		state.main = data.main;
		state.sys = data.sys;
		state.name = data.name;
		/* 	async function getUser() {
			try {
				const res = await axios.get('/api');

				state.data = res.data;
			} catch (error) {
				console.error(error);
			}
		}

		getUser(); */
	}, [data]);

	if (!snap.weather) return <div>Lodging...</div>;

	const { description, icon } = snap.weather;

	const { feels_like, temp_min, temp_max, humidity } = snap.main;
	const { sunrise, sunset } = snap.sys;

	const rise = new Date(sunrise * 1000).toLocaleTimeString();
	const sets = new Date(sunset * 1000).toLocaleTimeString();

	console.log(data);
	return (
		<>
			<Box maxW='7xl' mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
				<chakra.h1
					color='blue.300'
					fontFamily='serif'
					textAlign={'center'}
					fontSize={'5xl'}
					py={8}
					fontWeight={'bold'}>
					Where should you go today?
				</chakra.h1>

				<Grid
					columns={1}
					spacing={{ base: 3, lg: 2, md: 3 }}
					maxH='fit-content'
					maxW='2xl'
					mx='auto'
					p='4'>
					<StatsCard
						description={description}
						temp_min={temp_min}
						icon={icon}
						feels_like={feels_like}
						temp_max={temp_max}
						humidity={humidity}
						name={snap.name}
						sunrise={rise}
						sunset={sets}
					/>
					<SearchInput />
				</Grid>
			</Box>
		</>
	);
}

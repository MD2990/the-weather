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
					<StatNumber fontSize={'2xl'} fontWeight={'medium'}>
						{name}
					</StatNumber>
					<Image
						src={`http://openweathermap.org/img/wn/${icon}.png`}
						alt='universe'
						width={52}
						height={52}
					/>
					<StatLabel fontWeight={'medium'} isTruncated mt='-4' mb='8'>
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
					<StatNumber fontSize={'md'} fontWeight='bold' color='yellow.200'>
						Sunrise {sunrise}
					</StatNumber>

					<StatNumber fontSize={'md'} fontWeight='bold' color='yellow.400'>
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
		state.data = data.weather[0];
	}, [data]);


	console.log(snap.data);
	/* 		const [vantaEffect, setVantaEffect] = useState(0);
	const vantaRef = useRef(null);
	useEffect(() => {
			if (!vantaEffect) {
				setVantaEffect(
					BIRDS({
						el: vantaRef.current,
						THREE,
						color: 0xff3f81,
						backgroundColor: 0x15173c,
						maxDistance: 34.0,
					}),
				);
			}
			return () => {
				if (vantaEffect) vantaEffect.destory();
			};
		}, [vantaEffect]);
	 */

	const { icon, description } = snap.data;
	const { feels_like, temp_min, temp_max, humidity, name } = data.main;
	const { sunrise, sunset } = data.sys;

	const rise = new Date(sunrise * 1000).toLocaleTimeString();
	const sets = new Date(sunset * 1000).toLocaleTimeString();

	//var riseHours = rise.getHours();
	/* 	var riseMinutes = convertDate(rise.getMinutes()); 
	var setsHours = convertDate(sets.getHours())
	var setsMinutes =convertDate(sets.getMinutes()) */

	return (
		<Box
			//ref={vantaRef}
			maxW='7xl'
			mx={'auto'}
			pt={5}
			px={{ base: 2, sm: 12, md: 17 }}>
			<chakra.h1
				textAlign={'center'}
				fontSize={'4xl'}
				py={10}
				fontWeight={'bold'}>
				What is our company doing?
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
					name={data.name}
					sunrise={rise}
					sunset={sets}
				/>
				<SearchInput />
			</Grid>
		</Box>
	);
}

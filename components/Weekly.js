import {
	Box,
	Divider,
	HStack,
	Stack,
	Text,
	Wrap,
	WrapItem,
} from '@chakra-ui/layout';
import React from 'react';
import Image from 'next/image';
import { useSnapshot } from 'valtio';
import state from '../store';
import round from '../lib/functions';
import { GiSunrise, GiSunset } from 'react-icons/gi';
import { FaTemperatureHigh, FaTemperatureLow } from 'react-icons/fa';
import { FiSun } from 'react-icons/fi';
import { RiMoonClearFill } from 'react-icons/ri';


const Item = ({ color, attr, Icons, times }) => {
	return (
		<WrapItem>
			<Text
				textAlign='center'
				color='gray.200'
				fontSize={{ base: 'sm', lg: 'md', md: 'sm', sm: 'xs' }}>
				<Icons color={color} size='2.0rem' /> {attr ? round(attr) : times}
			</Text>
		</WrapItem>
	);
};

export default function Weekly() {
	const snap = useSnapshot(state);
	return (
		<Wrap spacing={4} justify='center' pt='4'>
			{snap.week.daily?.map((d, index) => {
				const ds = new Date(d.dt * 1000).toLocaleDateString();
				const options = { hour: '2-digit', minute: '2-digit' };
				const theDay = new Date(d.dt * 1000).toLocaleString('en-us', {
					weekday: 'long',
				});
				const sunrise = new Date(d.sunrise * 1000).toLocaleTimeString(
					'local',
					options,
				);
				const sunset = new Date(d.sunset * 1000).toLocaleTimeString(
					'local',
					options,
				);
				const min = d.temp.min;
				const max = d.temp.max;
				const day = d.temp.day;
				const night = d.temp.night;

				const weather = d.weather.map((w) => w);
				return (
					<Wrap
						key={index}
						className='im2'
						borderRadius='xl'
						justify='center'
						maxW='22rem'>
						<WrapItem pt='4'>
							<HStack
								justify='space-between'
								fontSize={{ base: 'sm', lg: 'lg', md: 'md', sm: 'xs' }}>
								<Text color='gray.100'>{index == 0 ? 'Today' : theDay}</Text>

								<Text
									color='gray.100'
									fontSize={{ base: 'sm', lg: 'lg', md: 'md', sm: 'xs' }}>
									{' '}
									{ds}
								</Text>
							</HStack>
						</WrapItem>

						<Divider mb='4' mt='2' borderColor='transparent' />
						<WrapItem>
							<Stack align='center'>
								{weather.map((w) => (
									<Box textAlign='center' key={w.id}>
										<Image
											src={`http://openweathermap.org/img/wn/${w.icon}.png`}
											alt='universe'
											width={52}
											height={52}
										/>
										<Text
											fontSize={{ base: 'md', lg: '2xl', md: 'xl', sm: 'xl' }}
											color='gray.200'
											isTruncated
											fontWeight='bold'
											textTransform='capitalize'
											textOverflow='ellipsis'
											mt='-4'>
											{w.description}
										</Text>
									</Box>
								))}
							</Stack>
						</WrapItem>

						<Divider borderColor='transparent' />

						<Wrap
							spacing={{ base: '2', lg: '4', md: '3', sm: '2' }}
							p={{ base: '2', lg: '4', md: '3', sm: '6' }}
							whiteSpace='nowrap'>
							<Item color='#fa2c07' attr={max} Icons={FaTemperatureHigh} />
							<Item color='#07fae2' attr={min} Icons={FaTemperatureLow} />
							<Item
								color='yellow'
								times={sunrise.replace('AM', '')}
								Icons={GiSunrise}
							/>

							<Item
								color='orange'
								times={sunset.replace('PM', '')}
								Icons={GiSunset}
							/>

							<Item color='yellow' attr={day} Icons={FiSun} />
							<Item color='#c99e26' attr={night} Icons={RiMoonClearFill} />
						</Wrap>
					</Wrap>
				);
			})}
		</Wrap>
	);
}

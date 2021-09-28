import {
	Box,
	Container,
	Divider,
	HStack,
	SimpleGrid,
	Stack,
	Text,
	VStack,
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

export default function Weekly() {
	const snap = useSnapshot(state);
	return (
		<SimpleGrid columns={3} spacing={10} minW='xl' justify='center'>
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
					<Wrap key={index} className='im2' borderRadius='xl' justify='center'>
						<WrapItem pt='4'>
							<HStack
								justify='space-between'
								fontSize={{ base: 'sm', lg: 'lg', md: 'md', sm: 'xs' }}>
								<Text>{index == 0 ? 'Today' : theDay}</Text>

								<Text> {ds}</Text>
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
											isTruncated
											textTransform='capitalize'
											textOverflow='ellipsis'
											mt='-4'>
											{' '}
											{w.description}
										</Text>
									</Box>
								))}
							</Stack>
						</WrapItem>

						<Divider borderColor='transparent' />

						<WrapItem>
							<VStack
								justify='center'
								border='solid 1px lightGreen'
								rounded='full'
								w='150px'
								h='80px'>
								<HStack>
									<Text textAlign='center'>
										<FaTemperatureHigh color='#fa2c07' size='1.8rem' />{' '}
										{round(max)}
									</Text>

									<Text textAlign='center'>
										<FaTemperatureLow color='#07fae2' size='1.8rem' />{' '}
										{round(min)}
									</Text>
								</HStack>
							</VStack>
						</WrapItem>
						<WrapItem>
							<VStack
								justify='center'
								border='solid 1px lightGreen'
								rounded='full'
								w='150px'
								h='80px'
								spacing='4'>
								<HStack>
									<Text textAlign='center'>
										<GiSunrise color='yellow' size='1.8rem' />{' '}
										{sunrise.replace('AM', '')}
									</Text>
									<Text textAlign='center'>
										<GiSunset color='orange' size='1.8rem' />
										{sunset.replace('PM', '')}{' '}
									</Text>
								</HStack>
							</VStack>
						</WrapItem>

						<WrapItem>
							<VStack
								justify='center'
								border='solid 1px lightGreen'
								rounded='full'
								w='150px'
								h='80px'
								spacing='4'>
								<HStack>
									<Text textAlign='center'>
										<FiSun color='yellow' size='1.8rem' />
										{round(day)}
									</Text>
									<Text textAlign='center'>
										<RiMoonClearFill color='#c99e26' size='1.8rem' />{' '}
										{round(night)}
									</Text>
								</HStack>
							</VStack>
						</WrapItem>

						{/* 	<WrapItem>
							<Divider
							orientation='vertical'
							borderColor='green.100'
							shadow='sm'
							/>
						</WrapItem> */}
					</Wrap>
				);
			})}
		</SimpleGrid>
	);
}

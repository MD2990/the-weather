import {
	Box,
	chakra,
	SimpleGrid,
	Stat,
	StatLabel,
	StatNumber,
	Center,
	Divider,
	HStack,
	Wrap,
	VStack,
	WrapItem,
	Text,
	Stack,
} from '@chakra-ui/react';

import Image from 'next/image';
import SearchInput from './SearchInput';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import state from '../store';
const round = (r) => Math.round(r || ' Lodging...') + '°';

function StatsCard({ currentData }) {
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
						{round(feels_like)}
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
						Min {round(temp_min)}
					</StatNumber>

					<StatNumber fontSize={'xl'} fontWeight='bold' color='cyan.200'>
						Max: {round(temp_max)}
					</StatNumber>
					<StatNumber fontSize={'xl'} fontWeight='bold' color='cyan.200'>
						Humidity: {humidity}
					</StatNumber>
				</HStack>
			</Stat>
		</Center>
	);
}

export default function Main({ currentData, weekData }) {
	const snap = useSnapshot(state);

	useEffect(() => {
		state.current = currentData;
		state.week = weekData;
	}, [currentData, weekData]);

	if (!snap.current || !snap.week) return <Center mt='20%'>Lodging...</Center>;

	const Weekly = () => {
		return (
			<>
				<Wrap spacing='2' justify='center' my='6' className='t2' p='2'>
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
								p='4'
								key={index}
								className='im2'
								borderRadius='xl'
								justify='space-around'
								maxW='30rem'
								spacing='4'>
								<WrapItem>
									<HStack
										justify='space-between'
										fontSize={{ base: 'sm', lg: 'lg', md: 'md', sm: 'xs' }}>
										<Text>{index == 0 ? 'Today' : theDay}</Text>

										<Text> {ds}</Text>
									</HStack>
								</WrapItem>

								<Divider
									mb='4'
									mt='2'
									borderColor='green.100'
									borderWidth='thin'
									shadow='2xl'
								/>

								<WrapItem>
									<VStack>
										<Text>Sunrise {sunrise.replace('AM', '')}</Text>

										<Text> Sunset {sunset.replace('PM', '')}</Text>
									</VStack>
								</WrapItem>
								<WrapItem>
									<Divider
										orientation='vertical'
										borderColor='green.100'
										shadow='sm'
									/>
								</WrapItem>

								<WrapItem>
									<VStack>
										<Text>Min {round(min)}</Text>
										<Text>Max {round(max)}</Text>
									</VStack>
								</WrapItem>
								<WrapItem>
									<Divider
										orientation='vertical'
										borderColor='green.100'
										shadow='sm'
									/>
								</WrapItem>
								<WrapItem>
									<VStack>
										<Text>Day {round(day)}</Text>
										<Text>Night {round(night)}</Text>
									</VStack>
								</WrapItem>
								<WrapItem>
									<Divider
										orientation='vertical'
										borderColor='green.100'
										shadow='sm'
									/>
								</WrapItem>
								<WrapItem>
									<VStack>
										<Stack mt='-5' p='1'>
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
									</VStack>
								</WrapItem>
							</Wrap>
						);
					})}
				</Wrap>
			</>
		);
	};

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
						color='blue.300'
						textAlign={'center'}
						fontSize={{ base: '2xl', lg: '4xl', md: '3xl', sm: 'lg' }}
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

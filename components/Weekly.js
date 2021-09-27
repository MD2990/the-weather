import {
	Box,
	Divider,
	HStack,
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

export default function Weekly() {
	const snap = useSnapshot(state);
	return (
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
	);
}

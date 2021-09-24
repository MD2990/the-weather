import React, { useRef } from 'react';
import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { VStack } from '@chakra-ui/layout';
import { log } from 'three';
import { useSnapshot } from 'valtio';
import state from '../store';

export default function SearchInput() {
	const snap = useSnapshot(state);
	const ref = useRef('');
	const handelChange = () => {
		const value = ref.current.value || '';

		if (!value.trim() || value.trim().length < 4) console.log('sorry');
		else {
			async function getData() {
				const API = process.env.API;
				const res = await fetch(
					`https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=${API}`,
				);
				const newData = await res.json();
				state.data = newData;
			}
			getData();
		}
	};
	return (
		<VStack mt='7'>
			<Input ref={ref} placeholder='Search for your city' size='lg' />
			<Button onClick={handelChange} size='lg'>
				Search
			</Button>
		</VStack>
	);
}

import React, { useRef } from 'react';
import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { VStack } from '@chakra-ui/layout';
import { log } from 'three';
import { useSnapshot } from 'valtio';
import state from '../store';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function SearchInput() {
	const snap = useSnapshot(state);
	const ref = useRef('');

	const handelChange = () => {
		const value = ref.current.value || '';

		if (!value.trim() || value.trim().length < 2) {
			Swal.fire({
				icon: 'info',
				title: 'Oops...',
				text: "Please enter some more characters to get your city's info ",
			});

			
			
		} else {
			async function getUser() {
				try
				{
					state.isLoading = true;
					const res = await axios.get(`/api/week/${value}`);

					console.log(res);

					state.week = res.data.week;

					state.weather = res.data.current.weather[0];
					state.main = res.data.current.main; 
					state.sys = res.data.current.sys;
					state.name = res.data.current.name;
					state.isLoading = false;
				} catch (error) {
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Something went wrong! Please check your city name and try again '+error,
					});
					state.isLoading = false;
				}
			}

			getUser();
		}
	};
	return (
		<VStack mt='7'>
			<Input ref={ref} placeholder='Search for your city' size='lg' />
			<Button onClick={handelChange} size='lg' isLoading={snap.isLoading}>
				Search
			</Button>
		</VStack>
	);
}

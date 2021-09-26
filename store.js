import { proxy } from 'valtio';

const state = proxy({
	weather: null,
	main: {},
	sys: {},
	name: {},
	isLoading: false,
	coord: {},
	week: {},
});

export default state;

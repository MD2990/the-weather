import { proxy } from 'valtio';

const state = proxy({
	isLoading: false,

	week: {},
	current: {},
});

export default state;

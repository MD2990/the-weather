import { proxy } from "valtio";
const state = proxy({
	isLoading: false,
	week: [],
	currentData: {},
	city: "",
});

export default state;

import { proxy } from 'valtio';

const state = proxy({ weather: null,main:{},sys:{},name:{},isLoading: false });

export default state;

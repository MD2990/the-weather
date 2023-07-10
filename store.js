import { proxy } from "valtio";
const state = proxy({
  isLoading: false,
  week: {},
  current: {},
  city: "",

});

export default state;

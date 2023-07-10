import React from "react";
import { VStack, Input, Button } from "@chakra-ui/react";
import { useSnapshot } from "valtio";
import state from "../store";
import axios from "axios";
import Swal from "sweetalert2";
import { TiWeatherStormy } from "react-icons/ti";

export default function SearchInput() {
  const snap = useSnapshot(state);

  const handelSubmit = () => {
    if (!snap.city.trim() || snap.city.trim().length <= 2)
      return Swal.fire({
        icon: "info",
        title: "Oops...",
        text: "Please enter some more characters to get your city's info ",
      });

    getUser();
  };
  return (
    <VStack mt="7" maxW="30rem" justify={"center"}>
      <Input
        noOfLines={1}
        type="search"
        placeholder="Search for your city"
        size={["xs", "sm", "md", "lg"]}
        onChange={(e) => {
          state.city = e.target.value;
        }}
        // on enter press
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handelSubmit();
          }
        }}
      />
      <Button
        py={"1rem"}
        leftIcon={<TiWeatherStormy size="2rem" color="lightGreen" />}
        colorScheme="teal"
        onClick={handelSubmit}
        size={["xs", "sm", "md", "lg"]}
        isLoading={snap.isLoading}
        isDisabled={snap.isLoading || snap.city.trim().length <= 2}
        loadingText={`Getting the weather for ${snap.city.toLocaleUpperCase()}`}
      >
        Get the weather
      </Button>
    </VStack>
  );
}
async function getUser() {
  try {
    state.isLoading = true;
    const res = await axios.get(`/api/week/${state.city}`);
    state.week = res.data.week;
    state.current = res.data.current;
    state.isLoading = false;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong! Please check your city name and try again ",
    });
    state.isLoading = false;
  }
}

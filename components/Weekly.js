import {
  Box,
  Divider,
  HStack,
  Text,
  Wrap,
  WrapItem,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import { useSnapshot } from "valtio";
import state from "../store";
import round from "../lib/functions";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { RiMoonClearFill } from "react-icons/ri";

const Item = ({ color, attr, Icons, times }) => {
  return (
    <WrapItem>
      <Text
        textAlign="center"
        color="gray.200"
        fontSize={{ base: "sm", lg: "md", md: "sm", sm: "xs" }}
      >
        <Icons color={color} size="2.0rem" /> {attr ? round(attr) : times}
      </Text>
    </WrapItem>
  );
};

export default function Weekly() {
  const snap = useSnapshot(state);
  return (
    <Wrap spacing={4} justify="center" pt="4">
      {snap.week.daily?.map((d, index) => {
        const ds = new Date(d.dt * 1000).toLocaleDateString();
        const options = { hour: "2-digit", minute: "2-digit" };
        const theDay = new Date(d.dt * 1000).toLocaleString("en-us", {
          weekday: "long",
        });
        const sunrise = new Date(d.sunrise * 1000).toLocaleTimeString(
          "local",
          options
        );
        const sunset = new Date(d.sunset * 1000).toLocaleTimeString(
          "local",
          options
        );
        const min = d.temp.min;
        const max = d.temp.max;
        const day = d.temp.day;
        const night = d.temp.night;

        const weather = d.weather.map((w) => w);
        return (
          <Wrap
            key={index}
            className="im2"
            borderRadius="xl"
            justify="center"
            maxW="22rem"
          >
            <WrapItem pt="4">
              <HStack
                justify="space-between"
                fontSize={["xx-small", "sm", "md"]}
                fontWeight={"bold"}
                color="gray.50"
				textShadow={"0px 1px 15px white"}
              >
                <Text fontFamily={"serif"}>
                  {index == 0 ? "Today" : theDay} {ds}
                </Text>
              </HStack>
            </WrapItem>

            <Divider mb="4" mt="2" borderColor="transparent" />

            <VStack
              textAlign="center"
              justify={"center"}
              boxShadow={"xl"}
              rounded={"2xl"}
            >
              {weather.map((w) => (
                <Box key={w.id} p="2" fontSize={["xl"]} px={[2, 4, 6, 8]}>
                  <Box align="center">
                    <Image
                      src={`http://openweathermap.org/img/w/${w.icon}.png`}
                      alt="universe"
                      quality={100}
                      width={50}
                      height={50}
                    />
                  </Box>

                  <Text
                    fontSize={["xx-small", "sm", "md", "lg", "xl"]}
                    color="gray.200"
                    fontWeight="bold"
                    textTransform="capitalize"
                    noOfLines={1}
                    textOverflow={"ellipsis"}
                  >
                    {w.description}
                  </Text>
                </Box>
              ))}
            </VStack>

            <Divider borderColor="transparent" />

            <Wrap
              spacing={[1, 2, 3, 4]}
              p={[1, 2, 3, 4]}
              whiteSpace="nowrap"
              justify="center"
            >
              <Item color="#fa2c07" attr={max} Icons={FaTemperatureHigh} />
              <Item color="#07fae2" attr={min} Icons={FaTemperatureLow} />
              <Item
                color="yellow"
                times={sunrise.replace("AM", "")}
                Icons={GiSunrise}
              />

              <Item
                color="orange"
                times={sunset.replace("PM", "")}
                Icons={GiSunset}
              />

              <Item color="yellow" attr={day} Icons={FiSun} />
              <Item color="#c99e26" attr={night} Icons={RiMoonClearFill} />
            </Wrap>
          </Wrap>
        );
      })}
    </Wrap>
  );
}

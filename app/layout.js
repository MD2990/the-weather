import { Providers } from "./providers";
import { use } from "react";
import "./globals.css";
import Main from "@components/Main";
import Swal from "sweetalert2";
import React from "react";
async function getData() {
  const API = process.env.API;
  try {
    const current = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=muscat&units=metric&appid=${API}`,
      {
        next: {
          revalidate: 60 * 60,
        },
      }
    );
    const currentData = await current.json();
    const week = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&\
		  
		  units=metric&exclude=hourly,minutely,current,alerts&appid=${API}`,
      {
        next: {
          revalidate: 60 * 60,
        },
      }
    );
    const weekData = await week.json();
    return { currentData, weekData };
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong! Please check your connection and try again ",
    });
  }
}
export default function RootLayout({ children }) {
  const data = use(getData());

  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <Main currentData={data.currentData} weekData={data.weekData} />;
        </Providers>
      </body>
    </html>
  );
}
export const metadata = {
  title: "The Weather App",
  description: "A weather app built with Next.js and Chakra UI by MAJID AHMED",
};

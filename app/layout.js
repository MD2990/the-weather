import "./globals.css";
import { Provider } from "@components/ui/provider";

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<Provider>{children}</Provider>
			</body>
		</html>
	);
}
export const metadata = {
	title: "The Weather App",
	description: "A weather app built with Next.js and Chakra UI by MAJID AHMED",
};

import Button from "@/components/button/Button";
import { router, type Href } from "expo-router";
import React from "react";
import { View } from "react-native";

type Animation = {
	title: string;
	href: Href;
};

const ANIMATIONS: Animation[] = [
	{
		title: "Corners breakdown",
		href: "/udemy/corners-breakdown",
	},
];

export default function HomeScreen() {
	return (
		<View className="flex-1">
			{ANIMATIONS.map(({ title, href }) => (
				<Button
					key={title}
					label={title}
					onPress={() => router.navigate(href)}
				/>
			))}
		</View>
	);
}

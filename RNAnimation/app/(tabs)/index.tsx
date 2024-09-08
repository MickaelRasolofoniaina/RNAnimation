import Button from "@/components/button/Button";
import { router, type Href } from "expo-router";
import React from "react";
import { FlatList, View } from "react-native";

type Animation = {
	title: string;
	href: Href;
};

const ANIMATIONS: Animation[] = [
	{
		title: "Corners",
		href: "/udemy/corners",
	},
	{
		title: "Messenger",
		href: "/udemy/messenger",
	},
	{
		title: "Kitten card",
		href: "/udemy/kitten",
	},
	{
		title: "Form",
		href: "/udemy/form",
	},
	{
		title: "Button",
		href: "/udemy/button",
	},
	{
		title: "Notification",
		href: "/udemy/notification",
	},
	{
		title: "Quiz",
		href: "/udemy/quiz",
	},
	{
		title: "Shared element",
		href: "/udemy/shared-element",
	},
	{
		title: "Text editor",
		href: "/udemy/text-editor",
	},
	{
		title: "Floating button",
		href: "/udemy/floating-button",
	},
];

export default function HomeScreen() {
	return (
		<View className="flex-1">
			<FlatList
				data={ANIMATIONS}
				renderItem={({ item: { title, href } }) => (
					<Button label={title} onPress={() => router.navigate(href)} />
				)}
				keyExtractor={({ title }) => title}
			/>
		</View>
	);
}

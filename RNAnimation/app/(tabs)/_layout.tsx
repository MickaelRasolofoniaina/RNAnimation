import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors.light.tint,
				headerShown: false,
			}}
			sceneContainerStyle={{
				padding: 16,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "home" : "home-outline"}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="about"
				options={{
					title: "About",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "information" : "information-outline"}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="links"
				options={{
					title: "Links",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "link" : "link-outline"}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}

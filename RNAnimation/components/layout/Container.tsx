import { View, type ViewProps } from "react-native";
import Title from "../typography/Typography";
import { Stack } from "expo-router";

export type ContainerProps = {
	title?: string;
	screenTitle: string;
} & ViewProps;

export default function Container(props: ContainerProps) {
	return (
		<View {...props} className="flex-1">
			<Stack.Screen
				options={{
					title: props.screenTitle,
				}}
			/>
			{props.title && <Title>{props.title}</Title>}
			{props.children && props.children}
		</View>
	);
}

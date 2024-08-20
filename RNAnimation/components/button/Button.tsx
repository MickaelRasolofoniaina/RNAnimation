import {
	type TouchableOpacityProps,
	TouchableOpacity,
	Text,
} from "react-native";

export type ButtonProps = {
	label: string;
} & TouchableOpacityProps;

export default function Button(props: ButtonProps) {
	return (
		<TouchableOpacity {...props} className="p-4 bg-red-400 mb-4">
			<Text className=" text-center text-white">{props.label}</Text>
		</TouchableOpacity>
	);
}

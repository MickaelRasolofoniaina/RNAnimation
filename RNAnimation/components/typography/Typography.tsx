import { Text, type TextProps } from "react-native";

export default function Title(props: TextProps) {
	return <Text {...props} className="mb-5 text-lg" />;
}

import { TextInput, TextInputProps } from "react-native";

export default function Input(props: TextInputProps) {
	return <TextInput {...props} className="bg-white p-4 mb-4" />;
}

import { forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native";

export const Input = forwardRef(
	(props: TextInputProps, ref: React.ForwardedRef<TextInput>) => {
		return <TextInput {...props} className="bg-white p-4 mb-4" ref={ref} />;
	}
);

export default Input;

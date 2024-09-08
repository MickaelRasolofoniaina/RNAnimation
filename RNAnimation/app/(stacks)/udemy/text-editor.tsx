import Container from "@/components/layout/Container";
import { useRef, useState } from "react";
import {
	TouchableOpacity,
	View,
	Animated,
	Text,
	TextInput,
	Keyboard,
} from "react-native";

export default function TextEditor() {
	const [textColor, setTextColor] = useState("#000000");
	const [previewColor, setPreviewColor] = useState("#000000");
	const show = useRef(false);

	const animation = useRef(new Animated.Value(0)).current;
	const editorAnimation = useRef(new Animated.Value(0)).current;

	const triggerCloseAnimation = () => {
		Animated.timing(animation, {
			toValue: 0,
			duration: 250,
			useNativeDriver: false,
		}).start(() => {
			show.current = false;
			setTextColor(previewColor);
		});
	};

	const handleTextPress = () => {
		if (show.current) {
			triggerCloseAnimation();
		} else {
			Animated.timing(animation, {
				toValue: 1,
				duration: 250,
				useNativeDriver: false,
			}).start(() => {
				show.current = true;
			});
		}
	};

	const handleColorClick = () => {
		Animated.timing(editorAnimation, {
			toValue: 1,
			duration: 260,
			useNativeDriver: false,
		}).start();
	};

	const handleConfirm = () => {
		Keyboard.dismiss();

		Animated.timing(editorAnimation, {
			toValue: 0,
			duration: 260,
			useNativeDriver: false,
		}).start(() => {
			triggerCloseAnimation();
		});
	};

	return (
		<Container
			screenTitle="Text editor"
			className="items-center justify-center"
		>
			<Animated.View
				className="py-4 px-8 mb-6 bg-white rounded-2xl overflow-hidden flex-row items-center justify-between min-w-[250]"
				style={{
					transform: [
						{
							scale: animation.interpolate({
								inputRange: [0, 1],
								outputRange: [0.5, 1],
								extrapolate: "clamp",
							}),
						},
						{
							translateY: animation.interpolate({
								inputRange: [0, 1],
								outputRange: [50, 0],
								extrapolate: "clamp",
							}),
						},
					],
					opacity: animation,
				}}
			>
				<TouchableOpacity onPress={handleColorClick}>
					<View
						className="w-[30] h-[30] rounded-full z-20 mr-6"
						style={{
							backgroundColor: previewColor,
						}}
					/>
				</TouchableOpacity>
				<View className="flex-1 flex-row justify-between">
					<View className="flex-1 flex-row justify-between">
						<Text className="text-3xl text-slate-300">B</Text>
						<Text className="text-3xl italic text-slate-300">I</Text>
						<Text className="text-3xl text-slate-300">H</Text>
					</View>
					<Animated.View className="absolute top-0 right-0 bottom-0 left-0 flex-row items-center">
						<Animated.View
							className="overflow-hidden bg-white h-full justify-center"
							style={{
								width: editorAnimation.interpolate({
									inputRange: [0, 1],
									outputRange: ["0%", "95%"],
									extrapolate: "clamp",
								}),
							}}
						>
							<TextInput
								value={previewColor}
								onChangeText={(text) => setPreviewColor(text)}
							/>
						</Animated.View>
						<TouchableOpacity onPress={handleConfirm}>
							<Animated.View
								className="w-[30] h-[30] rounded-full bg-blue-600 items-center justify-center"
								style={{
									transform: [
										{
											scale: editorAnimation.interpolate({
												inputRange: [0, 1],
												outputRange: [0, 1.5],
												extrapolate: "clamp",
											}),
										},
									],
								}}
							>
								<Text className="text-white">OK</Text>
							</Animated.View>
						</TouchableOpacity>
					</Animated.View>
				</View>
			</Animated.View>
			<Animated.Text
				className="text-4xl"
				onPress={handleTextPress}
				style={{ color: textColor }}
			>
				Hello World!
			</Animated.Text>
		</Container>
	);
}

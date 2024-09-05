import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import { Stack } from "expo-router";
import { useRef, useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	View,
	Text,
	Animated,
} from "react-native";

export default function Notification() {
	const viewRef = useRef<View>(null);

	const [notification, setNotification] = useState("");
	const [text, setText] = useState("");

	const showNotification = () => {
		setNotification("");
		viewRef.current?.measure((_, __, ___, height) => {
			translate.setValue(-height);
			Animated.sequence([
				Animated.parallel([
					Animated.timing(translate, {
						toValue: 0,
						duration: 500,
						useNativeDriver: true,
					}),
					Animated.timing(opacity, {
						toValue: 1,
						duration: 500,
						useNativeDriver: true,
					}),
				]),
				Animated.delay(500),
				Animated.parallel([
					Animated.timing(translate, {
						toValue: -height,
						duration: 500,
						useNativeDriver: true,
					}),
					Animated.timing(opacity, {
						toValue: 0,
						duration: 500,
						useNativeDriver: true,
					}),
				]),
			]).start();
		});
	};

	const translate = useRef(new Animated.Value(0)).current;
	const opacity = useRef(new Animated.Value(0)).current;

	return (
		<View className="flex-1 items-center justify-center p-4">
			<Stack.Screen
				options={{
					title: "Notification",
				}}
			/>
			<Animated.View
				className="absolute top-0 left-0 right-0 bg-pink-400 p-8"
				ref={viewRef}
				style={{
					transform: [
						{
							translateY: translate,
						},
					],
					opacity,
				}}
			>
				<Text className="text-white">{text}</Text>
			</Animated.View>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				className="flex-row"
			>
				<View className="flex-1">
					<Input
						value={notification}
						onChangeText={(text) => {
							setNotification(text);
							setText(text);
						}}
					/>
					<Button label="Show notification" onPress={showNotification} />
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

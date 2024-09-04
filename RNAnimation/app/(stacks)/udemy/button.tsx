import Container from "@/components/layout/Container";
import {
	TouchableWithoutFeedback,
	Text,
	View,
	Animated,
	Easing,
} from "react-native";

export default function Button() {
	const animation = new Animated.Value(0);
	const opacity = new Animated.Value(1);

	const handlePress = () => {
		animation.setValue(0);
		opacity.setValue(1);

		Animated.sequence([
			Animated.timing(animation, {
				toValue: 1,
				duration: 500,
				easing: Easing.out(Easing.sin),
				useNativeDriver: false,
			}),
			Animated.timing(opacity, {
				toValue: 0,
				duration: 500,
				useNativeDriver: false,
			}),
		]).start();
	};

	const width = animation.interpolate({
		inputRange: [0, 1],
		outputRange: ["0%", "100%"],
		extrapolate: "clamp",
	});

	const color = animation.interpolate({
		inputRange: [0, 1],
		outputRange: ["#22c55e", "#3b82f6"],
		extrapolate: "clamp",
	});

	return (
		<Container screenTitle="Button" className="items-center justify-center">
			<TouchableWithoutFeedback onPress={handlePress}>
				<View className="py-4 w-[200] bg-pink-500">
					<Animated.View
						className="bg-green-500 absolute top-0 left-0 right-0 bottom-0"
						style={{
							width,
							opacity,
							backgroundColor: color,
						}}
					/>
					<Text className="text-white text-center"> Get it!</Text>
				</View>
			</TouchableWithoutFeedback>
		</Container>
	);
}

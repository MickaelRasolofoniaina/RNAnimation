import Container from "@/components/layout/Container";
import { TouchableWithoutFeedback, Animated, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BOX_WIDTH = 100;
const BOX_HEIGHT = 100;
const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;
const HEADER_HEIGHT = 50;

export default function CornersBreakdown() {
	const { top, bottom } = useSafeAreaInsets();

	const translateY = new Animated.Value(0);
	const translateX = new Animated.Value(0);

	const interpolatedTY = translateY.interpolate({
		inputRange: [0, 1],
		outputRange: [0, WINDOW_HEIGHT - HEADER_HEIGHT - top - bottom - BOX_HEIGHT],
	});

	const interpolatedTX = translateX.interpolate({
		inputRange: [0, 1],
		outputRange: [0, WINDOW_WIDTH - BOX_WIDTH],
	});

	const startAnimation = () => {
		Animated.sequence([
			Animated.spring(translateY, {
				toValue: 1,
				useNativeDriver: false,
			}),
			Animated.delay(500),
			Animated.spring(translateX, {
				toValue: 1,
				useNativeDriver: false,
			}),
			Animated.delay(500),
			Animated.spring(translateY, {
				toValue: 0,
				useNativeDriver: false,
			}),
			Animated.delay(500),
			Animated.spring(translateX, {
				toValue: 0,
				useNativeDriver: false,
			}),
		]).start();
	};

	return (
		<Container screenTitle="Corners breakdown">
			<TouchableWithoutFeedback onPress={startAnimation}>
				<Animated.View
					style={{
						height: BOX_HEIGHT,
						width: BOX_WIDTH,
						backgroundColor: "darkorange",
						transform: [
							{
								translateY: interpolatedTY,
							},
							{
								translateX: interpolatedTX,
							},
						],
					}}
				/>
			</TouchableWithoutFeedback>
		</Container>
	);
}

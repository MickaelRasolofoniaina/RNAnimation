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

	const translate = new Animated.ValueXY();

	const startAnimation = () => {
		Animated.sequence([
			Animated.spring(translate.y, {
				toValue: WINDOW_HEIGHT - HEADER_HEIGHT - top - bottom - BOX_HEIGHT,
				useNativeDriver: false,
			}),
			Animated.spring(translate.x, {
				toValue: WINDOW_WIDTH - BOX_WIDTH,
				useNativeDriver: false,
			}),
			Animated.spring(translate.y, {
				toValue: 0,
				useNativeDriver: false,
			}),
			Animated.spring(translate.x, {
				toValue: 0,
				useNativeDriver: false,
			}),
		]).start();
	};

	return (
		<Container screenTitle="Corners">
			<TouchableWithoutFeedback onPress={startAnimation}>
				<Animated.View
					style={{
						height: BOX_HEIGHT,
						width: BOX_WIDTH,
						backgroundColor: "darkorange",
						transform: translate.getTranslateTransform(),
					}}
				/>
			</TouchableWithoutFeedback>
		</Container>
	);
}

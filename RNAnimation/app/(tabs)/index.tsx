import { useState } from "react";
import {
	Animated,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
	Text,
} from "react-native";

export default function HomeScreen() {
	const [reverse, setReverse] = useState(false);
	const [size] = useState(new Animated.Value(200));

	//const size = new Animated.Value(200);

	const onStartAnimation = () => {
		const toValue = reverse ? 200 : 300;

		Animated.timing(size, {
			toValue,
			duration: 1000,
			useNativeDriver: false,
		}).start(() => {
			setReverse((r) => !r);
		});
	};

	const animatedStyle = {
		width: size,
	};

	return (
		<View style={styles.container}>
			<TouchableWithoutFeedback onPress={onStartAnimation}>
				<Animated.View style={[styles.box, animatedStyle]}>
					<Text>This is a card</Text>
				</Animated.View>
			</TouchableWithoutFeedback>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	box: {
		backgroundColor: "orange",
		width: 200,
		height: 200,
	},
});

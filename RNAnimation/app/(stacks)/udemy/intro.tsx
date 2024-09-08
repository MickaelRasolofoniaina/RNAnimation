import Container from "@/components/layout/Container";
import { ScrollView, View, Dimensions, Image, Animated } from "react-native";

export default function Intro() {
	const WINDOW_WIDTH = Dimensions.get("window").width;

	const scrollX = new Animated.Value(0);

	return (
		<Container screenTitle="Intro" className="flex-1">
			<ScrollView
				horizontal
				contentContainerStyle={{
					flexDirection: "row",
				}}
				snapToInterval={WINDOW_WIDTH}
				decelerationRate="fast"
				onScroll={Animated.event(
					[
						{
							nativeEvent: {
								contentOffset: { x: scrollX },
							},
						},
					],
					{ useNativeDriver: false }
				)}
			>
				<View
					className="flex-1 justify-center bg-white"
					style={[{ width: WINDOW_WIDTH }]}
				>
					<Animated.Image
						source={{
							uri: "https://www.estiv-ales.fr/wp-content/uploads/2023/06/Logo-Partenaires-Burger-King.png",
						}}
						resizeMode="contain"
						style={{
							width: 200,
							height: 200,
							transform: [
								{
									translateX: scrollX.interpolate({
										inputRange: [0, WINDOW_WIDTH],
										outputRange: [0, WINDOW_WIDTH / 2],
										extrapolate: "clamp",
									}),
								},
							],
							opacity: scrollX.interpolate({
								inputRange: [0, WINDOW_WIDTH],
								outputRange: [1, 0],
								extrapolate: "clamp",
							}),
						}}
					/>
				</View>
				<View
					className="flex-1 justify-center bg-white"
					style={[{ width: WINDOW_WIDTH }]}
				>
					<Animated.Image
						source={{
							uri: "https://www.estiv-ales.fr/wp-content/uploads/2023/06/Logo-Partenaires-Burger-King.png",
						}}
						resizeMode="contain"
						style={{
							width: 200,
							height: 200,
							transform: [
								{
									scale: scrollX.interpolate({
										inputRange: [0, WINDOW_WIDTH],
										outputRange: [0, 1],
										extrapolate: "extend",
									}),
								},
							],
						}}
					/>
				</View>
				<View
					className="flex-1 justify-center bg-white"
					style={[{ width: WINDOW_WIDTH }]}
				>
					<Animated.Image
						source={{
							uri: "https://www.estiv-ales.fr/wp-content/uploads/2023/06/Logo-Partenaires-Burger-King.png",
						}}
						resizeMode="contain"
						style={{
							width: 200,
							height: 200,
							transform: [
								{
									translateX: scrollX.interpolate({
										inputRange: [WINDOW_WIDTH, WINDOW_WIDTH * 2],
										outputRange: [200, 0],
										extrapolate: "extend",
									}),
								},
								{
									translateY: scrollX.interpolate({
										inputRange: [WINDOW_WIDTH, WINDOW_WIDTH * 2],
										outputRange: [200, 0],
										extrapolate: "extend",
									}),
								},
							],
						}}
					/>
				</View>
			</ScrollView>
		</Container>
	);
}

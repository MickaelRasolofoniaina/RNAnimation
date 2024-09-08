import Container from "@/components/layout/Container";
import { useRef } from "react";
import {
	TouchableOpacity,
	Text,
	View,
	Image,
	Animated,
	Dimensions,
	Pressable,
} from "react-native";

export default function FloatingButton() {
	const WINDOW_WIDTH = Dimensions.get("window").width;
	const WINDOW_HEIGHT = Dimensions.get("window").height;
	const DIAGONAL = Math.sqrt(
		WINDOW_WIDTH * WINDOW_WIDTH + WINDOW_HEIGHT * WINDOW_HEIGHT
	);

	const orderAnimation = new Animated.Value(0);
	const reloadAnimation = new Animated.Value(0);
	const payAnimation = new Animated.Value(0);
	const backdropScale = new Animated.Value(0);

	const open = useRef(false);

	const toggleMenuHandler = () => {
		if (open.current) {
			orderAnimation.setValue(0);
			reloadAnimation.setValue(0);
			payAnimation.setValue(0);
			backdropScale.setValue(0);
			open.current = false;
		} else {
			Animated.parallel([
				Animated.timing(backdropScale, {
					toValue: 1,
					duration: 500,
					useNativeDriver: false,
				}),
				Animated.stagger(100, [
					Animated.spring(payAnimation, {
						toValue: 1,
						useNativeDriver: false,
						friction: 4,
					}),
					Animated.spring(reloadAnimation, {
						toValue: 1,
						useNativeDriver: false,
						friction: 4,
					}),
					Animated.spring(orderAnimation, {
						toValue: 1,
						useNativeDriver: false,
						friction: 4,
					}),
				]),
			]).start(({ finished }) => {
				if (finished) {
					open.current = true;
				}
			});
		}
	};

	return (
		<Container screenTitle="Floating button" className="flex-1">
			<View className="flex-1">
				<TouchableOpacity onPress={toggleMenuHandler}>
					<Animated.View
						style={[
							{
								width: DIAGONAL * 2,
								height: DIAGONAL * 2,
								borderRadius: DIAGONAL,
								position: "absolute",
								top: WINDOW_HEIGHT - DIAGONAL,
								left: WINDOW_WIDTH - DIAGONAL,
								backgroundColor: "#000",
								opacity: 0.4,
							},
							{
								transform: [
									{
										scale: backdropScale,
									},
								],
							},
						]}
					/>
				</TouchableOpacity>
				<View className="absolute right-8 bottom-8">
					<View className="flex-row items-center justify-end mb-4">
						<Animated.Text
							className="font-bold text text-white"
							style={{
								opacity: orderAnimation,
								transform: [
									{
										translateX: orderAnimation.interpolate({
											inputRange: [0, 0.5, 1],
											outputRange: [20, 20, 0],
											extrapolate: "clamp",
										}),
									},
								],
							}}
						>
							Order
						</Animated.Text>
						<View className="w-[100] h-[100] ml-[25]">
							<Animated.View
								className="w-[80] h-[80] bg-white rounded-full overflow-hidden p-4"
								style={{
									transform: [
										{
											scale: orderAnimation,
										},
									],
								}}
							>
								<Image
									className="flex-1"
									source={{
										uri: "https://icons.iconarchive.com/icons/paomedia/small-n-flat/512/phone-icon.png",
									}}
								/>
							</Animated.View>
						</View>
					</View>
					<View className="flex-row items-center justify-end mb-4">
						<Animated.Text
							className="font-bold text text-white"
							style={{
								opacity: reloadAnimation,
								transform: [
									{
										translateX: reloadAnimation.interpolate({
											inputRange: [0, 0.5, 1],
											outputRange: [20, 20, 0],
											extrapolate: "clamp",
										}),
									},
								],
							}}
						>
							Reload
						</Animated.Text>
						<View className="w-[100] h-[100] ml-[25]">
							<Animated.View
								className="w-[80] h-[80] bg-white rounded-full overflow-hidden p-4"
								style={{
									transform: [
										{
											scale: reloadAnimation,
										},
									],
								}}
							>
								<Image
									className="flex-1"
									source={{
										uri: "https://cdn-icons-png.flaticon.com/512/724/724863.png",
									}}
								/>
							</Animated.View>
						</View>
					</View>
					<View className="flex-row items-center justify-end">
						<Animated.Text
							className="font-bold text text-white"
							style={{
								opacity: payAnimation,
								transform: [
									{
										translateX: payAnimation.interpolate({
											inputRange: [0, 1],
											outputRange: [20, 0],
											extrapolate: "clamp",
										}),
									},
								],
							}}
						>
							Pay
						</Animated.Text>
						<TouchableOpacity
							className="w-[100] h-[100]  ml-[25] rounded-full items-center justify-center bg-green-600"
							onPress={toggleMenuHandler}
						>
							<Text className="text-white font-bold text-lg">$1.31</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Container>
	);
}

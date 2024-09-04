import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import Container from "@/components/layout/Container";
import Title from "@/components/typography/Typography";
import { useEffect } from "react";
import { View, Animated } from "react-native";

export default function Form() {
	const emailInputAnimatedValue = new Animated.Value(0);
	const passwordAnimatedValue = new Animated.Value(0);
	const buttonAnimatedValue = new Animated.Value(0);

	useEffect(() => {
		Animated.stagger(200, [
			Animated.timing(emailInputAnimatedValue, {
				toValue: 1,
				duration: 500,
				useNativeDriver: false,
			}),
			Animated.timing(passwordAnimatedValue, {
				toValue: 1,
				duration: 500,
				useNativeDriver: false,
			}),
			Animated.timing(buttonAnimatedValue, {
				toValue: 1,
				duration: 500,
				useNativeDriver: false,
			}),
		]).start();
	}, []);

	return (
		<Container
			screenTitle="Form"
			className="px-4 flex-1 items-center justify-center"
		>
			<View className="w-full px-5">
				<Title className="text-center">Login</Title>
				<Animated.View
					style={[
						{
							opacity: emailInputAnimatedValue,
							transform: [
								{
									translateY: emailInputAnimatedValue.interpolate({
										inputRange: [0, 1],
										outputRange: [-20, 0],
										extrapolate: "clamp",
									}),
								},
							],
						},
					]}
				>
					<Input placeholder="Email" />
				</Animated.View>
				<Animated.View
					style={[
						{
							opacity: passwordAnimatedValue,
							transform: [
								{
									translateY: emailInputAnimatedValue.interpolate({
										inputRange: [0, 1],
										outputRange: [-20, 0],
										extrapolate: "clamp",
									}),
								},
							],
						},
					]}
				>
					<Input placeholder="Password" />
				</Animated.View>
				<Animated.View
					style={[
						{
							opacity: buttonAnimatedValue,
							transform: [
								{
									translateY: emailInputAnimatedValue.interpolate({
										inputRange: [0, 1],
										outputRange: [-20, 0],
										extrapolate: "clamp",
									}),
								},
							],
						},
					]}
				>
					<Button label="Login" />
				</Animated.View>
			</View>
		</Container>
	);
}

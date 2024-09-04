import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import Container from "@/components/layout/Container";
import Title from "@/components/typography/Typography";
import { useEffect } from "react";
import { View, Animated, ViewProps } from "react-native";

type SlideAnimationProps = {
	animatedValue: Animated.Value;
} & ViewProps;

function getAnimatedStyles(from: Animated.Value) {
	return {
		opacity: from,
		transform: [
			{
				translateY: from.interpolate({
					inputRange: [0, 1],
					outputRange: [-20, 0],
					extrapolate: "clamp",
				}),
			},
		],
	};
}

function SlideAnimation({ animatedValue, ...rest }: SlideAnimationProps) {
	return <Animated.View style={getAnimatedStyles(animatedValue)} {...rest} />;
}

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
				<SlideAnimation animatedValue={emailInputAnimatedValue}>
					<Input placeholder="Email" />
				</SlideAnimation>
				<SlideAnimation animatedValue={passwordAnimatedValue}>
					<Input placeholder="Password" />
				</SlideAnimation>
				<SlideAnimation animatedValue={buttonAnimatedValue}>
					<Button label="Login" />
				</SlideAnimation>
			</View>
		</Container>
	);
}

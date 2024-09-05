import Container from "@/components/layout/Container";
import { useState, useRef } from "react";
import {
	TouchableWithoutFeedback,
	View,
	Text,
	Dimensions,
	Animated,
} from "react-native";

const QUESTIONS = [
	"Are your ready?",
	"Do you like video games?",
	"Do you like football?",
	"Do you like playing guitar?",
];

export default function Quiz() {
	const height = Dimensions.get("window").height;
	const width = Dimensions.get("window").width;
	const numberOfQuestions = QUESTIONS.length;

	const [count, setCount] = useState(0);

	const translateX = useRef(new Animated.Value(0)).current;
	const progress = useRef(new Animated.Value(0)).current;
	const background = useRef(new Animated.Value(0)).current;

	const onChoose = () => {
		const currentCount = count + 1;

		Animated.parallel([
			Animated.timing(translateX, {
				toValue: -1 * width * currentCount,
				duration: 500,
				useNativeDriver: false,
			}),
			Animated.timing(progress, {
				toValue: currentCount,
				duration: 500,
				useNativeDriver: false,
			}),
		]).start(() => {
			setCount(currentCount);
			if (currentCount === numberOfQuestions) {
				Animated.timing(background, {
					toValue: 1,
					duration: 500,
					useNativeDriver: false,
				}).start();
			}
		});
	};

	const onNo = () => {
		onChoose();
	};

	const onYes = () => {
		onChoose();
	};

	const onClose = () => {
		translateX.setValue(0);
		progress.setValue(0);
		background.setValue(0);
		setCount(0);
	};

	return (
		<Container screenTitle="Quiz" className="flex-1">
			<Animated.View
				className="flex-1 flex-row"
				style={{
					backgroundColor: background.interpolate({
						inputRange: [0, 1],
						outputRange: ["#FFFFFF", "#f87171"],
						extrapolate: "clamp",
					}),
				}}
			>
				{count < numberOfQuestions && (
					<TouchableWithoutFeedback onPress={onNo}>
						<View className="flex-1 bg-red-500 justify-end items-center pb-10">
							<Text className="text-white text-lg font-bold">NO</Text>
						</View>
					</TouchableWithoutFeedback>
				)}
				{count < numberOfQuestions && (
					<TouchableWithoutFeedback onPress={onYes}>
						<View className="flex-1 bg-red-400 justify-end items-center pb-10">
							<Text className="text-white text-lg font-bold">YES</Text>
						</View>
					</TouchableWithoutFeedback>
				)}
				<TouchableWithoutFeedback onPress={onClose}>
					<View className="absolute top-5 right-5">
						<Text className="text-white text-sm font-bold">Close</Text>
					</View>
				</TouchableWithoutFeedback>
				<Animated.View
					className="absolute flex-row"
					style={{
						top: height / 3,
						transform: [
							{
								translateX,
							},
						],
					}}
				>
					{QUESTIONS.map((q) => (
						<Text
							key={q}
							className="text-white font-bold text-lg text-center"
							style={{ width }}
						>
							{q}
						</Text>
					))}
					{count === numberOfQuestions && (
						<Text
							className="text-white font-bold text-lg text-center"
							style={{ width }}
						>
							THANKS FOR YOUR RESPONSE
						</Text>
					)}
				</Animated.View>
				<View className="absolute left-0 right-0 bottom-0 ">
					<Animated.View
						className="h-2 bg-cyan-500"
						style={{
							width: progress.interpolate({
								inputRange: [0, numberOfQuestions],
								outputRange: ["0%", "100%"],
								extrapolate: "clamp",
							}),
						}}
					/>
				</View>
			</Animated.View>
		</Container>
	);
}

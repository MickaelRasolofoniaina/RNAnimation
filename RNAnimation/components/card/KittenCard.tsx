import {
	ImageSourcePropType,
	View,
	Image,
	Text,
	Animated,
	PanResponder,
} from "react-native";

type Props = {
	image: ImageSourcePropType;
	description: string;
	onRemove: () => void;
};

const DX_THRESHOLD = 50;
const DX_DROP = DX_THRESHOLD * 2;

export default function KittenCard({ image, description, onRemove }: Props) {
	const translate = new Animated.ValueXY();
	const translateX = Animated.divide(translate.x, 1.8);

	const panResponder = PanResponder.create({
		onStartShouldSetPanResponder: () => true,
		onPanResponderGrant: (_, __) => {},
		onPanResponderMove: Animated.event(
			[
				null,
				{
					dx: translate.x,
					dy: translate.y,
				},
			],
			{ useNativeDriver: false }
		),
		onPanResponderRelease: (_, { dx, vx, vy }) => {
			if (Math.abs(dx) < DX_DROP) {
				Animated.spring(translate, {
					toValue: { x: 0, y: 0 },
					useNativeDriver: false,
					bounciness: 12,
				}).start();
			} else {
				Animated.decay(translate, {
					velocity: { x: vx, y: vy },
					deceleration: 0.5,
					useNativeDriver: false,
				}).start(({ finished }) => {
					if (finished) {
						onRemove();
					}
				});
			}
		},
	});

	return (
		<Animated.View
			className="shadow-sm shadow-slate-400"
			{...panResponder.panHandlers}
			style={{
				transform: [
					...translate.getTranslateTransform(),
					{
						rotate: translateX.interpolate({
							inputRange: [-DX_THRESHOLD, 0, DX_THRESHOLD],
							outputRange: ["-30deg", "0deg", "30deg"],
							extrapolate: "clamp",
						}),
					},
				],
				opacity: translateX.interpolate({
					inputRange: [-DX_THRESHOLD, 0, DX_THRESHOLD],
					outputRange: [0.8, 1, 0.8],
					extrapolate: "clamp",
				}),
			}}
		>
			<View className="rounded-md overflow-hidden">
				<View>
					<Image source={image} width={300} height={200} />
					<Animated.View
						className="w-[80] h-[60] absolute bg-white justify-center items-center top-[20] left-[20] border-2 border-green-700"
						style={[
							{
								transform: [
									{
										rotate: "-33deg",
									},
									{
										scale: translateX.interpolate({
											inputRange: [0, DX_THRESHOLD],
											outputRange: [0, 1],
											extrapolate: "clamp",
										}),
									},
								],
								opacity: translateX.interpolate({
									inputRange: [0, DX_THRESHOLD],
									outputRange: [0, 1],
									extrapolate: "clamp",
								}),
							},
						]}
					>
						<Text className="text-green-700">Yup!</Text>
					</Animated.View>
					<Animated.View
						className="w-[80] h-[60] absolute bg-white justify-center items-center  top-[20] right-[20] border-2 border-red-700"
						style={[
							{
								transform: [
									{
										rotate: "33deg",
									},
									{
										scale: translateX.interpolate({
											inputRange: [-DX_THRESHOLD, 0],
											outputRange: [1, 0],
											extrapolate: "clamp",
										}),
									},
								],
								opacity: translateX.interpolate({
									inputRange: [-DX_THRESHOLD, 0],
									outputRange: [1, 0],
									extrapolate: "clamp",
								}),
							},
						]}
					>
						<Text className="text-red-700">Nop!</Text>
					</Animated.View>
				</View>
				<View className="bg-white p-2 min-h-[100]">
					<Text>{description}</Text>
				</View>
			</View>
		</Animated.View>
	);
}

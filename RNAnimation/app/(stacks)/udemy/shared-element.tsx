import Container from "@/components/layout/Container";
import { useEffect, useRef, useState } from "react";
import {
	View,
	TouchableOpacity,
	Animated,
	Dimensions,
	Text,
} from "react-native";

const IMAGES: { id: number; image: string; description: string }[] = [
	{
		id: 0,
		image:
			"https://images.freeimages.com/images/large-previews/bd6/juneau-city-dog-1233051.jpg?fmt=webp&w=500",
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
	},
	{
		id: 1,
		image:
			"https://images.freeimages.com/images/large-previews/c40/guide-dog-fetching-stick-0410-5697069.jpg?fmt=webp&w=500",
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
	},
	{
		id: 2,
		image:
			"https://images.freeimages.com/images/large-previews/77f/the-dog-1312101.jpg?fmt=webp&w=500",
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
	},
	{
		id: 3,
		image:
			"https://images.freeimages.com/images/large-previews/460/hot-dog-1314799.jpg?fmt=webp&w=500",
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
	},
	{
		id: 4,
		image:
			"https://media.istockphoto.com/id/1675345470/fr/photo/un-adorable-chien-beagle-grattant-le-corps-%C3%A0-lext%C3%A9rieur-sur-le-terrain-dherbe.webp?b=1&s=612x612&w=0&k=20&c=fzTGY1VNTDhtrZ3yOeH-ZwZeu3iIxszy4BWMoGo9dOc=",
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
	},
	{
		id: 5,
		image:
			"https://images.freeimages.com/images/large-previews/ed6/happy-dog-swimming-serenely-0410-5697270.jpg?fmt=webp&w=500",
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
	},
	{
		id: 6,
		image:
			"https://images.freeimages.com/images/large-previews/83c/jumping-dog-1359508.jpg?fmt=webp&w=500",
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
	},
];

const IMAGE_CONTAINER_WIDTH = Dimensions.get("window").width;
const IMAGE_CONTAINER_HEIGHT = Dimensions.get("window").height / 3;

export default function SharedElement() {
	const [selectedId, setSelectedId] = useState(-1);

	const imageRefs: View[] = [];

	const size = new Animated.ValueXY();
	const position = new Animated.ValueXY();
	const opacity = new Animated.Value(0);
	const originalOpacity = new Animated.Value(1);

	const originalSize = useRef({ x: 0, y: 0 });
	const originalPosition = useRef({ x: 0, y: 0 });

	const onView = (id: number) => {
		setSelectedId(id);
	};

	const onClose = () => {
		Animated.parallel([
			Animated.timing(size, {
				toValue: {
					x: originalSize.current.x,
					y: originalSize.current.y,
				},
				duration: 500,
				useNativeDriver: false,
			}),
			Animated.timing(position, {
				toValue: {
					x: originalPosition.current.x,
					y: originalPosition.current.y,
				},
				duration: 500,
				useNativeDriver: false,
			}),
			Animated.timing(opacity, {
				toValue: 0,
				duration: 500,
				useNativeDriver: false,
			}),
		]).start(({ finished }) => {
			if (finished) {
				originalOpacity.setValue(1);
				setSelectedId(-1);
			}
		});
	};

	useEffect(() => {
		if (selectedId > -1) {
			const selectedImage = imageRefs[selectedId];

			selectedImage.measure((_x, _y, width, height) => {
				originalSize.current = { x: width, y: height };
				originalPosition.current = { x: _x, y: _y };

				size.x.setValue(width);
				size.y.setValue(height);

				position.x.setValue(_x);
				position.y.setValue(_y);

				originalOpacity.setValue(0);

				Animated.parallel([
					Animated.timing(opacity, {
						toValue: 1,
						duration: 500,
						useNativeDriver: false,
					}),
					Animated.timing(size, {
						toValue: {
							x: IMAGE_CONTAINER_WIDTH,
							y: IMAGE_CONTAINER_HEIGHT,
						},
						duration: 500,
						useNativeDriver: false,
					}),
					Animated.timing(position, {
						toValue: { x: 0, y: 0 },
						duration: 500,
						useNativeDriver: false,
					}),
				]).start();
			});
		}
	}, [selectedId]);

	const selectedImage = IMAGES.find((image) => image.id === selectedId);

	return (
		<Container screenTitle="Shared element">
			<View className="flex-1 flex-row flex-wrap">
				{IMAGES.map(({ id, image }) => (
					<TouchableOpacity
						key={id}
						onPress={() => onView(id)}
						className="flex-1 basis-1/3 h-[100] grow-0"
						ref={(ref) => {
							if (ref) {
								imageRefs[id] = ref;
							}
						}}
					>
						<Animated.Image
							source={{
								uri: image,
							}}
							resizeMode="cover"
							className="flex-1"
							style={{
								opacity: id === selectedId ? originalOpacity : 1,
							}}
						/>
					</TouchableOpacity>
				))}
			</View>
			{selectedId > -1 && (
				<View className="absolute top-0 right-0 bottom-0 left-0">
					<View
						style={{
							width: IMAGE_CONTAINER_WIDTH,
							height: IMAGE_CONTAINER_HEIGHT,
						}}
					>
						<Animated.Image
							source={{
								uri: selectedImage?.image,
							}}
							resizeMode="cover"
							style={{
								position: "absolute",
								width: size.x,
								height: size.y,
								top: position.y,
								left: position.x,
							}}
						/>
					</View>
					<Animated.View
						className="flex-[3] p-4 bg-white"
						style={{
							transform: [
								{
									translateY: opacity.interpolate({
										inputRange: [0, 1],
										outputRange: [50, 0],
										extrapolate: "clamp",
									}),
								},
							],
							opacity,
						}}
					>
						<Text>{selectedImage?.description}</Text>
					</Animated.View>
					<TouchableOpacity
						onPress={onClose}
						className="absolute top-4 right-4"
					>
						<Animated.Text className="text-white" style={{ opacity }}>
							Close
						</Animated.Text>
					</TouchableOpacity>
				</View>
			)}
		</Container>
	);
}

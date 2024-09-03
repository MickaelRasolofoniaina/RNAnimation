import KittenCard from "@/components/card/KittenCard";
import Container from "@/components/layout/Container";
import { useState } from "react";
import { View, Text, Animated } from "react-native";

type Kitten = {
	id: number;
	image: string;
	description: string;
	scale: Animated.Value;
};

const KITTENS: Kitten[] = [
	{
		id: 1,
		image:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Juvenile_Ragdoll.jpg/1200px-Juvenile_Ragdoll.jpg",
		description: "White kitten",
		scale: new Animated.Value(0.8),
	},
	{
		id: 2,
		image:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF08wbZeJDlwbOTkKlnNYcdKve_Y2lCasOEQ&s",
		description: "Yellow kitten",
		scale: new Animated.Value(0.8),
	},
	{
		id: 3,
		image:
			"https://assets-global.website-files.com/62604bb9b6d9d12008ba1216/627d0cbe0c5bbd447a635839_new-kitten-checklist.jpg",
		description: "Three black yellow kitten",
		scale: new Animated.Value(0.8),
	},
	{
		id: 4,
		image:
			"https://www.whiskas.co.uk/cdn-cgi/image/format=auto,q=90/sites/g/files/fnmzdf5651/files/2022-09/Kitten-mobile.jpg",
		description: "Black grey kitten",
		scale: new Animated.Value(1),
	},
];

export default function Kitten() {
	const [kittens, setKittens] = useState(KITTENS);

	const onRemove = () => {
		const indexToRemove = kittens.length - 1;
		const prevIndex = indexToRemove - 1;

		setKittens((kittens) => {
			const values = [...kittens];
			values.pop();
			return values;
		});

		if (prevIndex > -1) {
			Animated.spring(kittens[prevIndex].scale, {
				toValue: 1,
				useNativeDriver: false,
				bounciness: 20,
			}).start();
		}
	};

	return (
		<Container screenTitle="Kitten card">
			<View className="flex-1 items-center justify-center">
				{kittens.map(({ id, image, description, scale }) => (
					<Animated.View
						key={id}
						className="absolute"
						style={[
							{
								transform: [{ scale }],
							},
						]}
					>
						<KittenCard
							image={{
								uri: image,
							}}
							description={description}
							onRemove={onRemove}
						/>
					</Animated.View>
				))}
			</View>
			{/* We can also create a dedicated component for this */}
			<View className="flex-row justify-center gap-4 pb-2">
				<View className="w-[60] h-[60] rounded-full shadow-sm shadow-red-600 bg-white justify-center items-center">
					<Text className="text-red-600">No</Text>
				</View>
				<View className="w-[60] h-[60] rounded-full shadow-sm shadow-green-600 bg-white justify-center items-center">
					<Text className="text-green-600">Yes</Text>
				</View>
			</View>
		</Container>
	);
}

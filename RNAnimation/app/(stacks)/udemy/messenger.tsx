import Container from "@/components/layout/Container";
import React from "react";
import { PanResponder, Animated, View } from "react-native";

const AVATARS = [
	"https://img.freepik.com/psd-gratuit/illustration-3d-avatar-profil-humain_23-2150671142.jpg",
	"https://www.creativefabrica.com/wp-content/uploads/2022/11/23/African-American-Chibi-Woman-Avatar-With-Curly-Hair-And-Glasses-48065957-1.png",
	"https://st2.depositphotos.com/41960954/42058/i/450/depositphotos_420585092-stock-photo-beautiful-woman-portrait-digital-illustration.jpg",
];

export default function Messenger() {
	const STAGGER_DURATION = 50;

	const translates = AVATARS.map(() => new Animated.ValueXY());
	const lastTranslates = translates[translates.length - 1];
	const length = translates.length;

	const panResponder = PanResponder.create({
		// Ask to be the responder:
		onStartShouldSetPanResponder: (evt, gestureState) => true,
		onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
		onMoveShouldSetPanResponder: (evt, gestureState) => true,
		onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

		onPanResponderGrant: (evt, gestureState) => {
			// The gesture has started. Show visual feedback so the user knows
			// what is happening!
			// gestureState.d{x,y} will be set to zero now
		},
		onPanResponderMove: (evt, gestureState) => {
			// The most recent move distance is gestureState.move{X,Y}
			// The accumulated gesture distance since becoming responder is
			// gestureState.d{x,y}
			const { dx, dy } = gestureState;

			lastTranslates.x.setValue(dx);
			lastTranslates.y.setValue(dy);

			for (let i = 0; i < length - 1; i++) {
				setTimeout(() => {
					translates[i].x.setValue(dx);
					translates[i].y.setValue(dy);
				}, STAGGER_DURATION * (length - i));
			}
		},
		onPanResponderTerminationRequest: (evt, gestureState) => true,
		onPanResponderRelease: (evt, gestureState) => {
			// The user has released all touches while this view is the
			// responder. This typically means a gesture has succeeded
			lastTranslates.extractOffset();

			for (let i = 0; i < length - 1; i++) {
				setTimeout(() => {
					translates[i].extractOffset();
				}, STAGGER_DURATION * (length - i));
			}
		},
		onPanResponderTerminate: (evt, gestureState) => {
			// Another component has become the responder, so this gesture
			// should be cancelled
		},
		onShouldBlockNativeResponder: (evt, gestureState) => {
			// Returns whether this component should block native components from becoming the JS
			// responder. Returns true by default. Is currently only supported on android.
			return true;
		},
	});

	return (
		<Container screenTitle="Messenger">
			<View>
				{AVATARS.map((avatar, index) => {
					const panHandler =
						index === AVATARS.length - 1 ? panResponder.panHandlers : null;
					return (
						<Animated.Image
							key={avatar}
							source={{
								uri: avatar,
							}}
							className="w-28 h-28 rounded-full overflow-hidden absolute"
							style={{
								transform: translates[index].getTranslateTransform(),
								zIndex: index,
							}}
							{...panHandler}
						/>
					);
				})}
			</View>
		</Container>
	);
}

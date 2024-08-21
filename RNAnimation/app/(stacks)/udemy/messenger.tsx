import Container from "@/components/layout/Container";
import React from "react";
import { PanResponder, Animated, View } from "react-native";

const AVATARS = [
	"https://img.freepik.com/psd-gratuit/illustration-3d-avatar-profil-humain_23-2150671142.jpg",
	"https://www.creativefabrica.com/wp-content/uploads/2022/11/23/African-American-Chibi-Woman-Avatar-With-Curly-Hair-And-Glasses-48065957-1.png",
	"https://st2.depositphotos.com/41960954/42058/i/450/depositphotos_420585092-stock-photo-beautiful-woman-portrait-digital-illustration.jpg",
];

// This contains bugs comparing to the previous version using timeout
// Try to figure out how to fix it

export default function Messenger() {
	const STAGGER_DURATION = 50;

	const translates = AVATARS.map(() => new Animated.ValueXY());

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

			translates.forEach((translate) => {
				translate.extractOffset();
				translate.setValue({ x: 0, y: 0 });
			});
		},
		onPanResponderMove: (evt, { dx, dy }) => {
			// The most recent move distance is gestureState.move{X,Y}
			// The accumulated gesture distance since becoming responder is
			// gestureState.d{x,y}
			translates[translates.length - 1].setValue({ x: dx, y: dy });

			translates.slice(0, translates.length - 1).forEach((translate, index) => {
				Animated.sequence([
					Animated.delay(STAGGER_DURATION * (translates.length - index)),
					Animated.spring(translate, {
						toValue: { x: dx, y: dy },
						useNativeDriver: false,
					}),
				]).start();
			});
		},
		onPanResponderTerminationRequest: (evt, gestureState) => true,
		onPanResponderRelease: (evt, gestureState) => {
			// The user has released all touches while this view is the
			// responder. This typically means a gesture has succeeded
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
						index === AVATARS.length - 1 ? panResponder.panHandlers : {};
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

import { Button } from "native-base";
import { memo } from "react";
import { StyleSheet, Text } from "react-native";

interface Props {
	title: string;
	onPress?: () => void;
	width?: string | number;
	height?: string | number;
	textColor?: string;
	backgroundColor?: string;
	isLoading?: boolean;
	style?: {};
	fontFamily?: string;
}

export const ButtonComponent = memo(
	({
		title,
		onPress,
		width,
		height,
		textColor = "#fff",
		backgroundColor,
		isLoading,
		style,
		fontFamily,
	}: Props) => {
		return (
			<Button
				onPress={onPress}
				style={{ ...style }}
				bg={backgroundColor}
				w={width}
				h={height}
				isLoading={isLoading}
				_text={{
					color: textColor,
				}}
			>
				<Text style={{ fontFamily: fontFamily, ...styles.text }}>{title}</Text>
			</Button>
		);
	},
);

export default ButtonComponent;

const styles = StyleSheet.create({
	text: {
		color: "#FFF",
	},
});

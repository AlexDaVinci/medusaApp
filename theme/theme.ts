import { extendTheme } from "native-base";

const theme = extendTheme({
	fontConfig: {
		"Azeret Mono": {
			regular: {
				fontFamily: "Azeret Mono",
			},
		},
	},
	colors: {
		primary: {
			50: "#7AB1E3",
			100: "#6DA9E0",
			200: "#5FA0DD",
			300: "#5098DA",
			400: "#4190D7",
			500: "#020515", // <-- This is the main primary color
			600: "#2E7FD1",
			700: "#2A77CE",
			800: "#256FCA",
			900: "#1F67C7",
		},
		secondary: {
			50: "#F3F3F3",
			100: "#F2F2F2",
			200: "#F1F1F1",
			300: "#F0F0F0",
			400: "#EEEEEE",
			500: "#7d32ca", // <-- This is the main secondary color
			600: "#E1E1E1",
			700: "#DCDCDC",
			800: "#D6D6D6",
			900: "#C3C3C3",
		},
		custom: {
			primary: "#1D4F94",
			secondary: "#EBEBEB",
			tertiary: "#C8CACC",
			background: "#FFFFFF",
			success: "#00FF00",
			error: "#FF0000",
			warning: "#FFFF00",
			info: "#0000FF",
			text: "#000000",
			textLight: "#FFFFFF",
		},
	},
	config: {
		initialColorMode: "light",
		useSystemColorMode: false,
	},
	fontWeights: {
		hairline: 100,
		thin: 200,
		light: 300,
		normal: 400,
		medium: 500,
		semibold: 600,
		bold: 700,
		extrabold: 800,
		black: 900,
		extraBlack: 950,
	},
	fontSizes: {
		sm: 14,
		md: 16,
		lg: 18,
		xl: 20,
		"2xl": 24,
	},
	spacing: {
		small: 4,
		medium: 8,
		large: 12,
		xlarge: 16,
		xxlarge: 20,
	},
});

export default theme;

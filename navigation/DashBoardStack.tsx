import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/HomeScreen";

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
const Stack = createStackNavigator();

export const DashBoardStack = () => {
	return (
		<Stack.Navigator
			initialRouteName="HomeScreen"
			screenOptions={{
				headerShown: false,
			}}
		>
			{/* <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} /> */}
			<Stack.Screen name="HomeScreen" component={HomeScreen} />
		</Stack.Navigator>
	);
};

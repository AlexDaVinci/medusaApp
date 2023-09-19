import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/LoginScreen";

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
const Stack = createStackNavigator<any>();

export const AuthStack = () => {
	return (
		<Stack.Navigator
			initialRouteName="login"
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="login" component={LoginScreen} />
		</Stack.Navigator>
	);
};

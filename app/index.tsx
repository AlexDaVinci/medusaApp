import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { AuthProvider } from '../context/AuthContext'; // Asegúrate de importar correctamente
import { AuthStack } from '../navigation/AuthStack';
import { DashBoardStack } from '../navigation/DashBoardStack';
import theme from '../theme/theme';

const Stack = createStackNavigator();

const App = () => {
  console.log('Autenticado');
  return <StatusBar style="auto" />;
};

const AppWrapper = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <AuthProvider>
        <NavigationContainer independent={true}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="app"
          >
            <Stack.Screen name="app" component={AuthStack} />
            <Stack.Screen name="dashboard" component={DashBoardStack} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </NativeBaseProvider>
  );
};

export default AppWrapper;

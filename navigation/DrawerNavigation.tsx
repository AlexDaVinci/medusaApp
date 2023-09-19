import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName="homescreen">
      <Drawer.Screen name="homescreen" component={HomeScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

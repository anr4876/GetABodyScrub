import * as React from "react";
// import { Button, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import StackScreen1 from "./menu1Stack";
import StackScreen2 from "./menu2Stack";

//바텀 네비게이터
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

export default function StackScreen() {
  // return <NavigationContainer>{StackScreen1()}</NavigationContainer>;
  return (
    <Tab.Navigator initialRouteName = "StackScreen1">
      <Tab.Screen name = "StackScreen1" component={StackScreen1}/>
      <Tab.Screen name = "StackScreen2" component={StackScreen2}/>
    </Tab.Navigator>
  )
}

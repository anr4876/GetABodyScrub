import * as React from "react";
import { Button, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SelectionScreen from "./menu1/selectionScreen";
import DetailsScreen from "./menu1/detail";
import HomeScreen from "./menu1/home";
import ProfileScreen from "./menu1/profile";
import CalendarScreen from './Calender/calender';


const Stack = createNativeStackNavigator();

export default function StackScreen1() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Selection"
        component={SelectionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Calender"
        component={CalendarScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
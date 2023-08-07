import * as React from "react";
// import { Button, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import StackScreen1 from "./menu1Stack";

export default function StackScreen() {
  return <NavigationContainer>{StackScreen1()}</NavigationContainer>;
}

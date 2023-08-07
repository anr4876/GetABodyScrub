import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackScreen from "./screens/menu1Stack";

export default function Main() {
  return <NavigationContainer>{StackScreen()}</NavigationContainer>;
}

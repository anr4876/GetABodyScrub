import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackScreen from "./screens/mainStack";

export default function Main() {
  return <NavigationContainer>{StackScreen()}</NavigationContainer>;
}

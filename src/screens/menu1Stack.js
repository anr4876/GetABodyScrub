import * as React from "react";
import { Button, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SelectionScreen from "./menu1/selectionScreen";
import DetailsScreen from "./menu1/detail";
import HomeScreen from "./menu1/home";
import ProfileScreen from "./menu1/profile";

function LogoTitle() {
  return (
    <Image
      style={{ width: 40, height: 40 }}
      source={require(".././assets/test_rogo.png")}
    />
  );
}
const Stack = createNativeStackNavigator();

export default function StackScreen1() {
  return (
    <Stack.Navigator
      screenOptions={{
        title: "My home",
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: () => (
            <Button
              onPress={() => alert("This is a button!")}
              title="Info"
              color="#fff"
            />
          ),
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
      />
      <Stack.Screen
        name="Selection"
        component={SelectionScreen}
        options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
      />
    </Stack.Navigator>
  );
}

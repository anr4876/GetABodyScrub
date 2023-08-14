import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from './searchScreen';
import SelectionScreen from "./menu1/selectionScreen";

const Stack = createNativeStackNavigator();

export default function SearchStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                title: "Search",
                headerStyle: {
                    backgroundColor: "#f4511e",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
            }}
        >
            <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Selection" component={SelectionScreen} options={{ headerShown: false }}/>          
        </Stack.Navigator>
    );
}
import * as React from "react";
// import { Button, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StackScreen from "./screens/menu1Stack";
// import CreatePostScreen from "./screens/createPost";
// import DetailsScreen from "./screens/detail";
// import HomeScreen from "./screens/home";
// import ProfileScreen from "./screens/profile";

// function LogoTitle() {
//   return (
//     <Image
//       style={{ width: 40, height: 40 }}
//       source={require("./assets/test_rogo.png")}
//     />
//   );
// }
// const Stack = createNativeStackNavigator();

// function StackScreen() {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         title: "My home",
//         headerStyle: {
//           backgroundColor: "#f4511e",
//         },
//         headerTintColor: "#fff",
//         headerTitleStyle: {
//           fontWeight: "bold",
//         },
//       }}
//     >
//       <Stack.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           headerTitle: (props) => <LogoTitle {...props} />,
//           headerRight: () => (
//             <Button
//               onPress={() => alert("This is a button!")}
//               title="Info"
//               color="#fff"
//             />
//           ),
//         }}
//       />
//       <Stack.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
//       />
//       <Stack.Screen
//         name="Details"
//         component={DetailsScreen}
//         options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
//       />
//       <Stack.Screen
//         name="CreatePost"
//         component={CreatePostScreen}
//         options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
//       />
//     </Stack.Navigator>
//   );
// }

export default function Main() {
  return <NavigationContainer>{StackScreen()}</NavigationContainer>;
}

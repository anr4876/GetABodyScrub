import * as React from "react";
import { View, Text, Button } from "react-native";

export default function HomeScreen({ navigation, route }) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setCount((c) => c + 1)} title="Update count" />
      ),
    });
  }, [navigation]);

  React.useEffect(() => {
    if (route.params?.post) {
    }
  }, [route.params?.post]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Update the title"
        onPress={() => navigation.setOptions({ title: "Updated!" })}
      />
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate("Details", {
            itemId: 86,
            otherParam: "anything you want here",
          })
        }
      />
      <Button
        title="Create post"
        onPress={() => navigation.navigate("CreatePost")}
      />
      <Button
        title="Go to Profile"
        onPress={() =>
          navigation.navigate("Profile", { name: "Custom profile header" })
        }
      />
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
      <Text>Count: {count}</Text>
    </View>
  );
}

import * as React from "react";
import { Button, TextInput, StyleSheet, Dimensions, View } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function CreatePostScreen({ navigation }) {
  const [postText, setPostText] = React.useState("");

  return (
    <View style={styles.container}>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={styles.input}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          // Pass and merge params back to home screen
          navigation.navigate({
            name: "Home",
            params: { post: postText },
            merge: true,
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    padding: 10,
    backgroundColor: "white",
    height: windowHeight * 0.045,
    width: windowWidth * 0.6,
    alignSelf: "center",
    marginBottom: 20,
    borderColor: "#DD5151",
    borderWidth: 2,
    borderRadius: 8,
    // iOS 스타일 속성
    ...Platform.select({
      ios: {
        mixBlendMode: "color-burn",
        backdropFilter: "blur(2px)",
      },
      // Android 스타일 속성
      android: {
        elevation: 5,
      },
    }),
  },
});

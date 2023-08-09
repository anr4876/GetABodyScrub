import * as React from "react";
import {
  TextInput,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faMagnifyingGlass,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function CreatePostScreen({ navigation }) {
  const [postText, setPostText] = React.useState("");

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            multiline
            placeholder="What's on your mind?"
            style={styles.input}
            value={postText}
            onChangeText={setPostText}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate({
                name: "Home",
                params: { post: postText },
                merge: true,
              });
            }}
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{ color: "#DD5151" }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.dateContainer}>
          <TouchableOpacity style={styles.dateButton}>
            <FontAwesomeIcon
              icon={faCalendarDays}
              style={{ color: "#DD5151" }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rowContainer: {
    flexDirection: "row",
  },
  inputContainer: {
    flex: 2, // 2:1 비율
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#DD5151",
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: "white",
    ...Platform.select({
      android: {
        elevation: 5,
      },
    }),
  },
  input: {
    flex: 1,
    padding: 10,
  },
  dateContainer: {
    flex: 1, // 2:1 비율
  },
  dateButton: {
    width: 73,
    height: 28,
    borderWidth: 2,
    borderColor: "#DD5151",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

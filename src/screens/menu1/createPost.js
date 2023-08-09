import * as React from "react";
import {
  TextInput,
  Text,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faMagnifyingGlass,
  faCalendarDays,
  faBars,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";

const windowWidth = Dimensions.get("window").width;

function HeaderLine({ navigate }) {
  const [postText, setPostText] = React.useState("");

  return (
    <View style={styles.headerContainer}>
      <View style={styles.menuContainer}>
        <TouchableOpacity>
          <FontAwesomeIcon icon={faBars} style={{ color: "#DD5151" }} />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          multiline
          placeholder="?"
          style={styles.input}
          value={postText}
          onChangeText={setPostText}
        />
        <TouchableOpacity
          onPress={() => {
            navigate({
              name: "Home",
              params: { post: postText },
              merge: true,
            });
          }}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ color: "#DD5151", marginRight: 7 }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.dateContainer}>
        <TouchableOpacity style={styles.dateButton}>
          <Text style={styles.dateText}>예약일 선택</Text>
          <FontAwesomeIcon icon={faCalendarDays} style={{ color: "#DD5151" }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function MidLine({ navigate }) {
  return (
    <View>
      <FontAwesomeIcon icon={faLocationArrow} />
    </View>
  );
}

export default function CreatePostScreen({ navigation }) {
  return (
    <View style={styles.wrapper}>
      <HeaderLine navigate={navigation.navigate} />
      <MidLine />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  menuContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flex: 6,
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    borderColor: "#DD5151",
    borderWidth: 2,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    marginRight: (windowWidth * 0.05) / 2,
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
    flex: 2,
    justifyContent: "center",
    marginLeft: (windowWidth * 0.05) / 2,
  },
  dateButton: {
    flexDirection: "row",
    paddingHorizontal: 10,
    height: 40,
    borderWidth: 2,
    borderColor: "#DD5151",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: {
    marginRight: 8,
    fontSize: 10,
  },
});

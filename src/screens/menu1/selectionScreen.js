import * as React from "react";
import {
  TextInput,
  Text,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faMagnifyingGlass,
  faCalendarDays,
  faBars,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

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
    <View style={{ alignSelf: "flex-start", marginTop: -windowHeight * 0.32 }}>
      <FontAwesomeIcon icon={faLocationArrow} />
    </View>
  );
}

function BottomLine({ navigate }) {
  let name = "온천 불가마 사우나";
  let content = "대전광역시 유성구 봉명동 538-1";
  return (
    <View
      style={{
        alignSelf: "flex-start",
        marginTop: windowHeight * 0.35,
        marginLeft: windowWidth * 0.07,
      }}
    >
      <TouchableOpacity>
        <Image
          source={require("../../assets/test.png")}
          style={styles.separateImage}
        />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.content}>{content}</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require("../../assets/test2.png")}
          style={styles.separateImage}
        />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.content}>{content}</Text>
      </TouchableOpacity>
    </View>
  );
}

function SelectionScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <HeaderLine navigate={navigation.navigate} />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: 64 }}>
        <MidLine navigate={navigation.navigate} />
        <BottomLine navigate={navigation.navigate} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    ...Platform.select({
      ios: {
        zIndex: 10,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  headerContainer: {
    position: "absolute", // 여기에 position 속성 추가
    top: 0, // 상단 위치를 0으로 설정
    left: 0, // 왼쪽 위치를 0으로 설정
    width: "100%", // 너비를 100%로 설정하여 전체 너비를 차지하게 합니다.
    zIndex: 10, // 헤더가 항상 위에 올 수 있도록 zIndex 설정
    paddingTop: 4,
    paddingBottom: 4,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
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
  name: {
    width: windowWidth * 0.65,
    height: windowHeight * 0.04,
    left: windowWidth * 0.005,
    marginTop: windowHeight * 0.01,
    fontStyle: "normal",
    fontWeight: "800",
    fontSize: windowHeight * 0.02,
    lineHeight: windowHeight * 0.027,
    textAlign: "left",

    color: "#000000",
  },
  content: {
    width: windowWidth * 0.75,
    height: windowHeight * 0.04,
    left: windowWidth * 0.005,
    fontStyle: "normal",
    fontWeight: "500",
    textAlign: "left",
    fontSize: windowHeight * 0.015,
    lineHeight: windowHeight * 0.02,
    color: "#5E5E5E",
  },
  backgroundView: {
    position: "absolute",
    width: windowWidth * 0.8,
    height: windowHeight * 0.3,
    left: windowWidth * 0.05,
    top: windowHeight * 0.35,
  },
});

export default SelectionScreen;

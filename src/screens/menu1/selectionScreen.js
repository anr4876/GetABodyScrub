import React, { useState, useEffect } from "react";
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
  Modal,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faMagnifyingGlass,
  faCalendarDays,
  faBars,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
//달력모달
import Calendar from "../Calender/calender";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function HeaderLine({ navigate, selectedDistrict }) {
  const [postText, setPostText] = React.useState("");
  //달력모달
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
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
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Text style={styles.dateText}>예약일 선택</Text>
            <FontAwesomeIcon
              icon={faCalendarDays}
              style={{ color: "#DD5151" }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* 달력 팝업 */}
       <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View
              style={{
                width: '80%', // 모달 너비를 비율로 조정
                height: '60%', // 모달 높이를 비율로 조정
                backgroundColor: "white",
                borderRadius: 10, // 모달 모서리 둥글게
                padding: 20, // 모달 내부 패딩 추가
              }}
            >
              <View
                style={{
                  flex: 1, // 달력 컴포넌트 크기를 모달의 크기에 맞춤
                  justifyContent: "center", // 달력 컴포넌트 세로 중앙 정렬 추가
                  alignItems: "center", // 달력 컴포넌트 가로 중앙 정렬 추가
                }}
              >
                <Calendar onClose={() => setModalVisible(false)} />
              </View>
            </View>
          </View>
        </Modal>



    </View>
  );
}

function ArrowLine({ selectedDistrict }) {
  return (
    <View
      style={{
        flexDirection: "row",
        marginLeft: windowWidth * 0.035,
        marginBottom: windowHeight * 0.12,
      }}
    >
      <View style={styles.iconContainer}>
        <FontAwesomeIcon icon={faLocationArrow} style={styles.icon} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{selectedDistrict}</Text>
      </View>
      <View style={styles.line} />
    </View>
  );
}

function BottomLine({ navigate, selectedDistrict }) {
  const [items, setItems] = useState([]);
  const [isServiceAvailable, setIsServiceAvailable] = useState(true);
  const NAVIGATE_PARAM_REGION = selectedDistrict;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/locations/${NAVIGATE_PARAM_REGION}`
        );

        const data = await response.json();
        console.log("Fetched data:", data);

        if (data && data.length > 0) {
          setItems(data);
          setIsServiceAvailable(true);
        } else {
          setIsServiceAvailable(false);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  return (
    <View
      style={{
        alignSelf: "flex-start",
        marginTop: windowHeight * 0.03,
        marginLeft: windowWidth * 0.05,
      }}
    >
      {isServiceAvailable ? (
        items.map((item) => (
          <TouchableOpacity key={item.id}>
            <View style={styles.itemContainer}>
              <Image
                source={{ uri: item.image_path }}
                style={styles.separateImage}
              />
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.content}>{item.content}</Text>
              <Text>{item.price}</Text>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.unavailableServiceMessage}>
          서비스 준비중입니다
        </Text>
      )}
    </View>
  );
}

function SelectionScreen({ route, navigation }) {
  const { selectedDistrict } = route.params;

  return (
    <View style={styles.container}>
      <View style={{ position: "absolute", zIndex: 10, width: "100%" }}>
        <HeaderLine
          navigate={navigation.navigate}
          selectedDistrict={selectedDistrict}
        />
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 64,
          marginTop: 55,
        }}
      >
        <ArrowLine selectedDistrict={selectedDistrict} />
        <BottomLine
          navigate={navigation.navigate}
          selectedDistrict={selectedDistrict}
        />
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
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 10,
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
  itemContainer: {
    marginBottom: 16,
  },
  separateImage: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.3,
    resizeMode: "cover",
  },
  iconContainer: {
    position: "absolute",
    width: 22.96,
    height: 23.47,
    left: 21,
    top: 110.93,
    transform: [{ rotate: "0.01rad" }],
  },
  icon: {
    color: "#DD5151",
  },
  textContainer: {
    marginTop: 5,
  },
  text: {
    position: "absolute",
    width: 150,
    height: 43.65,
    left: 58,
    top: 110.72,
    //fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 20,
    lineHeight: 24,
  },
  line: {
    position: "absolute",
    width: windowWidth * 0.81,
    height: 0,
    left: 21,
    top: 145,
    borderWidth: 1,
    borderColor: "#DD5151",
  },
  unavailableServiceMessage: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: windowHeight * 0.015,
    lineHeight: windowHeight * 0.02,
    textAlign: "center",
    color: "#5E5E5E",
  },
});

export default SelectionScreen;

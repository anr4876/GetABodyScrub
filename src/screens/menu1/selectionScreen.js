import React, { useState, useEffect } from "react";
import { TextInput, Text, StyleSheet, Dimensions, View, TouchableOpacity, Platform, ScrollView, Image, Modal, } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMagnifyingGlass, faCalendarDays, faBars, faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import Calendar from "../calender";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const onDistrictPress = (district) => {
  navigation.navigate("Selection", { selectedDistrict: district });
};

function HeaderLine({ navigate, selectedDistrict }) {
  const [postText, setPostText] = React.useState("");
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      {/* 상단 블록 */}
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
            onPress={() => { setModalVisible(true); }}
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
              width: windowWidth * 0.8, // 모달 너비 조정
              height: windowHeight * 0.6, // 모달 높이 조정
              backgroundColor: "white",
              borderRadius: 10, // 모달 모서리 둥글게
            }}
          >
            <Calendar onClose={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* 하단 블록 */}
      <View
        style={{
          flexDirection: "row", // 세로로 정렬
          marginLeft:
            (windowWidth * 0.035),
          marginTop: windowHeight * 0.07, // 원하는 행 정보 조정할 수 있음
        }}
      >
        <View>
          <FontAwesomeIcon icon={faLocationArrow} />
        </View>
        <View style={{ marginTop: 5 }}>
          <Text>{selectedDistrict}</Text>
        </View>
      </View>
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
          `http://220.81.199.135:3000/items?region=${NAVIGATE_PARAM_REGION}`
        );
        const data = await response.json();
        console.log("Fetched data:", data);

        if (data.items && data.items.length > 0) {
          setItems(data.items);
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
        marginLeft: windowWidth * 0.07,
      }}
    >
      {isServiceAvailable
        ? items.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.separateImage}
            />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.content}>{item.content}</Text>
          </View>
        ))
        : (
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
      <HeaderLine
        navigate={navigation.navigate}
        selectedDistrict={selectedDistrict}
      />
      {/* <MidLine navigate={navigation.navigate} /> */}
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: 64 }}>
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
  itemContainer: {
    marginBottom: 16, // 아이템 간격 조정
  },
  separateImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
});

export default SelectionScreen;

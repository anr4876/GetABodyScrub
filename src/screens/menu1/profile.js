import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import regions from "../regions";

export default function ProfileScreen() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [text, setText] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [content, setContent] = useState({});

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("사진 액세스 권한이 필요합니다.");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleSubmit = () => {
    setContent({
      location: location,
      content: `${location} ${text}`,
    });

    const data = new FormData();
    if (image) {
      const uriParts = image.split(".");
      const fileType = uriParts[uriParts.length - 1];
      data.append("uploads_img", {
        uri: image,
        name: `image.${fileType}`,
        type: `image/${fileType}`,
      });
    }
    data.append("name", name);
    data.append("content", `${location} ${text}`);
    data.append("location", location);

    // 'Content-Type' 헤더를 설정하지 않고 fetch를 호출합니다.
    // 'boundary' 값은 자동으로 생성되며 FormData 인스턴스를 생성할 때 생성됩니다.
    fetch("http://localhost:3000/upload", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson:", responseJson);
        Alert.alert(
          "성공",
          "데이터가 성공적으로 전송되었습니다.",
          [{ text: "확인", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      })
      .catch((error) => {
        console.error(error);
        Alert.alert(
          "실패",
          `데이터 전송에 실패했습니다. 이유: ${error.message}`,
          [{ text: "확인", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      });
  };

  return (
    <View style={styles.container}>
      <Button title="이미지 선택" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
      )}

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="이름"
      />
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="지역"
        editable={false}
      />
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        multiline
        numberOfLines={4}
        placeholder="세부 위치"
      />

      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={province}
          onValueChange={(value) => {
            setProvince(value);
            setLocation(value);
          }}
        >
          <Picker.Item label="도 선택하기" value="" />
          {regions.map((region) => (
            <Picker.Item
              key={region.id}
              label={region.name}
              value={region.name.replace(/ /g, "")}
            />
          ))}
        </Picker>

        <Picker
          style={styles.picker}
          selectedValue={district}
          onValueChange={(value) => {
            setDistrict(value);
            setLocation(`${province} ${value}`);
          }}
        >
          <Picker.Item label="구 선택하기" value="" />
          {(
            regions.find((region) => region.name === province)?.districts || []
          ).map((d) => (
            <Picker.Item key={d} label={d} value={d.replace(/ /g, "")} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>작성하기</Text>
      </TouchableOpacity>

      <Text>{JSON.stringify(content)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    padding: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#1a73e8",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  picker: {
    flex: 1,
    backgroundColor: "white",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
});

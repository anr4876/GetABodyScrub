// calender.js
import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Dimensions } from "react-native";
import Calendar from "./cal";

export default function CalendarScreen() {
  const handleOnClose = () => {
    // 나가기 기능 구현
  };

  const handleOnReset = () => {
    // 초기화 기능 구현
  };
  const { width, height } = Dimensions.get("window");
  const styles = createStyleSheet(width, height);

  return (
    <View style={styles.container}>
      <Calendar onClose={handleOnClose} onReset={handleOnReset} />
      <StatusBar style="auto" />
    </View>
  );
}

function createStyleSheet(width, height) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      width: width,
      height: height,
    },
  });
}

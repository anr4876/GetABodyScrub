// calender.js
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Calendar from './cal';

export default function CalendarScreen() {
  const handleOnClose = () => {
    // 나가기 기능 구현
  };

  const handleOnReset = () => {
    // 초기화 기능 구현
  };

  return (
    <View style={styles.container}>
      <Calendar onClose={handleOnClose} onReset={handleOnReset} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

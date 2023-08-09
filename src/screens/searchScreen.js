import React, { useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const provinces = [
  { id: '1', name: '서울', districts: ['강남구', '강동구', '강북구'] },
  { id: '2', name: '경기', districts: ['수원시', '용인시', '화성시'] },
  { id: '3', name: '인천', districts: ['미추홀구', '남동구', '연수구'] },
  //...추가
];

function App() {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [districts, setDistricts] = useState([]);

  const onProvincePress = (province) => {
    setSelectedProvince(province.name);
    setDistricts(province.districts);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={provinces}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.provinceItem}
            onPress={() => onProvincePress(item)}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.provinceList}
      />
      <FlatList
        data={districts}
        keyExtractor={(item, index) => `${selectedProvince}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.districtItem}>
            <Text>{item}</Text>
          </View>
        )}
        contentContainerStyle={styles.districtList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  provinceList: {
    flexGrow: 1,
  },
  provinceItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#d8d8d8',
  },
  districtList: {
    flexGrow: 1,
  },
  districtItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#d8d8d8',
  },
});

export default App;